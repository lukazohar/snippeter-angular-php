import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ISnippet } from 'src/app/models/snippet.interface';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss']
})
export class SnippetsComponent {
  private apiUrl = "http://localhost/index.php";
  snippets: ISnippet[] = [];

  constructor(private router: Router, private http: HttpClient) {
    if (!localStorage.getItem("userId")) {
      this.router.navigate(["/login"]);
    } else {
      // load snippets
      this.http.get(`${this.apiUrl}/snippet/list?userId=${localStorage.getItem("userId")}`).subscribe((res: any) => {
        console.log(res);
        
        if (res) {
          this.snippets = res;
        } else {
          console.log("Error loading snippets");
        }
      });
    }
  }

  editSnippet(snippetId?: string) {
    this.router.navigate([`/snippets/${snippetId}`])
  }

  deleteSnippet(snippetId?: string) {
    this.http.delete(`${this.apiUrl}/snippet/delete?id=${snippetId}`).subscribe(res => {
      if (res) {
        const objWithIdIndex = this.snippets.findIndex((obj) => obj.id === snippetId);

        if (objWithIdIndex > -1) {
          this.snippets.splice(objWithIdIndex, 1);
        }
      }
    }, err => {
      console.log(err);
    })
  }
}
