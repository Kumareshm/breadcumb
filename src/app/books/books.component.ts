import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

    public books: Book[] = [];

    public constructor(private router: Router, private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.books.push(
            {
                "Id": 908,
                "Name": "THE FELLOWSHIP OF THE RING",
                "Price": 9.0,
                "Author": " J. R. R. Tolkien",
                "PictureURL": "http://www.tolkien.co.uk/file/IfbTdA8/e48239f6-ba35-4e69-858e-efd680f449b0.jpg",
                "Rating": 5
            }, {
                "Id": 910,
                "Name": "THE RETURN OF THE KING",
                "Price": 13.0,
                "Author": " J. R. R. Tolkien",
                "PictureURL": "http://www.tolkien.co.uk/file/IfbTdA8/fc3a59a7-1abc-4be2-96ce-83266a98a2e8.jpg",
                "Rating": 4
            }, {
                "Id": 912,
                "Name": "Harry Potter and the Philosopher's Stone",
                "Price": 10.0,
                "Author": "J. K. Rowling",
                "PictureURL": "http://t0.gstatic.com/images?q=tbn:ANd9GcSXGpfJzjAobQVs1AmpnWQf4amf8RzgLbc7twV6nOLncOwASjUM",
                "Rating": 4
            }, {
                "Id": 913,
                "Name": "Harry Potter and the Chamber of Secrets",
                "Price": 13.0,
                "Author": "J. K. Rowling",
                "PictureURL": "http://t0.gstatic.com/images?q=tbn:ANd9GcS4oHYYPXATs31IpUW4VWiX0KTuxLgDr-hLQ0Ov4_WPfPTvk8Zt",
                "Rating": 5
            }
        );
    }

    public goToBook(book: Book) {
        this.router.navigate(['book' , book.Id, book.Name], { relativeTo: this.route });
    }

}


export interface Book {
    Author: string;
    Name: string;
    Id: number;
    PictureURL: string;
    Price: number;
    Rating: number;
}
