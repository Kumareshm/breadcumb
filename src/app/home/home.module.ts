import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule, Routes} from "@angular/router";
import {BreadcrumbsModule} from "../../../../ng4-breadcrumbs/src/breadcrumbs.module";

const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    }

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HOME_ROUTES),
        BreadcrumbsModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {
}
