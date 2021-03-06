import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET} from "@angular/router";
import "rxjs/add/operator/filter";

import {IBreadcrumb} from "./breadcrumbs.service";
import {BreadcrumbsService} from "./breadcrumbs.service";


@Component({
    selector: "breadcrumb",
    template: `
        <div [ngClass]="{ 'fluid-bread': true} ">
            <div class="container">
                <ul [ngClass]="{ 'breadcrumb': allowBootstrap}" class="{{addClass ? '' + addClass : ''}}">
                    <li *ngFor="let breadcrumb of breadcrumbs; let last = last"
                        [ngClass]="{'list': true, 'active': last }">
                        <a *ngIf="!last" [routerLink]="hasParams(breadcrumb)">
                            {{breadcrumb.label}}
                        </a>
                        <span *ngIf="last">{{ breadcrumb.label }}</span>
                    </li>
                </ul>
            </div>
        </div>`,
    styles: [`
        .fluid-bread {
            background-color: white;
        }
        .breadcrumb li { display: inline-block; padding-right: 25px; }
        .breadcrumb {
            background-color: white;
            padding: 4px;
            margin-bottom: 0;
            list-style: none outside;
        }`],
    encapsulation: ViewEncapsulation.None
})

export class BreadcrumbComponent implements OnInit {

    // The breadcrumbs of the current route
    private currentBreadcrumbs: IBreadcrumb[];
    // All the breadcrumbs
    public breadcrumbs: IBreadcrumb[];

    @Input()
    public allowBootstrap: boolean;

    @Input()
    public addClass: string;


    public constructor(private breadcrumbService: BreadcrumbsService, private activatedRoute: ActivatedRoute, private router: Router) {
        breadcrumbService.get().subscribe((breadcrumbs: IBreadcrumb[]) => {
            this.breadcrumbs = breadcrumbs as IBreadcrumb[];
        });
    }

    public hasParams(breadcrumb: IBreadcrumb) {
        return Object.keys(breadcrumb.params).length ? [breadcrumb.url, breadcrumb.params] : [breadcrumb.url];
    }


    public ngOnInit() {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
        const ROUTE_PARAM_BREADCRUMB: string = "breadcrumb";

        // subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            this.currentBreadcrumbs = [];

            // get the root of the current route
            let currentRoute: ActivatedRoute = this.activatedRoute.root;


            // set the url to an empty string
            let url: string = "";

            // iterate from activated route to children
            while (currentRoute.children.length > 0) {
                let childrenRoutes: ActivatedRoute[] = currentRoute.children;
                let breadCrumbLabel: string = "";

                // iterate over each children
                childrenRoutes.forEach(route => {
                    // Set currentRoute to this route
                    currentRoute = route;
                    // Verify this is the primary route
                    if (route.outlet !== PRIMARY_OUTLET) {
                        return;
                    }

                    const hasData = (route.routeConfig && route.routeConfig.data);
                    const hasDynamicBreadcrumb: boolean = route.snapshot.params.hasOwnProperty(ROUTE_PARAM_BREADCRUMB);

                    if (hasData || hasDynamicBreadcrumb) {


                        /*
                         Verify the custom data property "breadcrumb"
                         is specified on the route or in its parameters.

                         Route parameters take precedence over route data
                         attributes.
                         */
                        if (hasDynamicBreadcrumb) {
                            breadCrumbLabel = route.snapshot.params[ROUTE_PARAM_BREADCRUMB].replace(/_/g, " ");
                        } else if (route.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                            breadCrumbLabel = route.snapshot.data[ROUTE_DATA_BREADCRUMB];
                        }

                        // Get the route's URL segment
                        let routeURL: string = route.snapshot.url.map(segment => segment.path).join("/");
                        url += `/${routeURL}`;

                        // Cannot have parameters on a root route
                        if (routeURL.length === 0) {
                            route.snapshot.params = {};
                        }


                        // Add breadcrumb
                        let breadcrumb: IBreadcrumb = {
                            label: breadCrumbLabel,
                            params: route.snapshot.params,
                            url: url
                        };
                        this.currentBreadcrumbs.push(breadcrumb);

                    }

                });

                this.breadcrumbService.store(this.currentBreadcrumbs);
            }
        });
    }
}