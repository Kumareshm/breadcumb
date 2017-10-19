import { Component, OnInit } from '@angular/core';
import {Book} from "../books.component";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

    public book: Book;

    public constructor() {
        this.book = {
            "Id": 908,
            "Name": "THE FELLOWSHIP OF THE RING",
            "Price": 9.0,
            "Author": " J. R. R. Tolkien",
            "PictureURL": "http://www.tolkien.co.uk/file/IfbTdA8/e48239f6-ba35-4e69-858e-efd680f449b0.jpg",
            "Rating": 5
        };
    }

    public ngOnInit() {
    }

}
