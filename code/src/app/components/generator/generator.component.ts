import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';
import { ISnippet } from '../../models/snippet.interface';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent {
  apiUrl = "http://localhost/index.php";

  name: FormControl = new FormControl("");
  prefix: FormControl = new FormControl("");
  description: FormControl = new FormControl("");
  body: FormControl = new FormControl("");

  constructor(private clipboard: Clipboard, private http: HttpClient) {
  }

  copy() {
    const snippet = this.convertOriginalToSnippet(
      this.name.value,
      this.prefix.value,
      this.description.value,
      this.body.value
    );
    this.clipboard.copy(snippet);
  }

  save() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const snippet: ISnippet = {
        name: this.name.value,
        prefix: this.prefix.value,
        description: this.description.value,
        body: this.body.value,
        userId: userId
      }
      this.http.post<ISnippet>(`${this.apiUrl}/snippet`, snippet).subscribe((res) => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    }
  }

  share() {

  }
  
  convertOriginalToSnippet(
    name: string,
    prefix: string,
    description: string,
    body: string
  ) {
    const snippetBodyArr: Array<string> = body.split('\n');
    let snippetBodyString = '';
    // Pushed new array cell for every new line in description string
    snippetBodyArr.forEach(row => {
      row = row.replace(/"/g, '\\"');
      snippetBodyString += `\t\t\t"${row}",\n`;
    });

    return (
      `"${name}": {\n` +
      `\t\t"prefix": "${prefix}",\n` +
      `\t\t"description": "${description}",\n` +
      `\t\t"body": [\n${snippetBodyString}\t\t],\n` +
      `\t}`
    );
  }
}
