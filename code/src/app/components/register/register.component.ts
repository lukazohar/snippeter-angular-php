import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  apiUrl = "";
  registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private http: HttpClient) {

  }

  register() {
    this.http.post(this.apiUrl, this.registerForm.value).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }

}
