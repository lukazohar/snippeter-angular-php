import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';
import { ISnippet } from '../../models/snippet.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent {
  apiUrl = "http://localhost/index.php";

  generatorForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(""),
    prefix: new FormControl(""),
    description: new FormControl(""),
    body: new FormControl(""),
  });

  constructor(private clipboard: Clipboard, private http: HttpClient, private route: ActivatedRoute) {
    const snippetId = this.route.snapshot.paramMap.get("id")

    this.http.get<ISnippet[]>(`${this.apiUrl}/snippet/get?id=${snippetId}`).subscribe(res => {
      if (res[0] != null) {
        this.generatorForm.get("id")?.setValue(res[0].id ? res[0].id : null);
        this.generatorForm.get("name")?.setValue(res[0].name);
        this.generatorForm.get("prefix")?.setValue(res[0].prefix);
        this.generatorForm.get("description")?.setValue(res[0].description);
        this.generatorForm.get("body")?.setValue(res[0].body);
      } else {
        console.log("Snippet doesn't exist!");
      }
    })
  }

  copy() {
    const snippet = this.convertOriginalToSnippet(
      this.generatorForm.get("name")?.value || "",
      this.generatorForm.get("prefix")?.value || "",
      this.generatorForm.get("description")?.value || "",
      this.generatorForm.get("body")?.value || ""
    );
    this.clipboard.copy(snippet);
  }

  save() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const snippet: ISnippet = {
        id: this.generatorForm.get("id")?.value || null,
        name: this.generatorForm.get("name")?.value || "",
        prefix: this.generatorForm.get("prefix")?.value || "",
        description: this.generatorForm.get("description")?.value || "",
        body: this.generatorForm.get("body")?.value || "",
        userId: parseInt(userId)
      };

      if (snippet.id) {
        this.http.put<ISnippet>(`${this.apiUrl}/snippet/edit?id=${snippet.id}`, snippet).subscribe((res) => {
          console.log(res);
        }, err => {
          console.log(err);
        });
      } else {
        this.http.post<ISnippet>(`${this.apiUrl}/snippet/add`, snippet).subscribe((res) => {
          console.log(res);
        }, err => {
          console.log(err);
        });
      }
    } else {

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
