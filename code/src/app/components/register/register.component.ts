import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  apiUrl = "http://localhost/index.php";

  registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    username: new FormControl(),
    email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl(),
  });

  constructor(private http: HttpClient, private router: Router) {

  }

  register() {
    if (!this.registerForm.get("email")?.valid) {
      alert("Error in Email!")
      return;
    }

    this.http.post(`${this.apiUrl}/user/register`, this.registerForm.value).subscribe(res => {
      if (res) {
        this.router.navigate(["login"]);
      }
    },
    err => {
      console.log(err);
    });
  }

}
