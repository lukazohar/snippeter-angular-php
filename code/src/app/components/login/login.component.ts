import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  apiUrl = "http://localhost/index.php";
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl(""),
  });

  constructor(private http: HttpClient, private router: Router) {

  }

  login() {
    this.http.post(`${this.apiUrl}/user/login`, this.loginForm.value).subscribe((res: any) => {
      if (res[0] != null) {
        alert("Snippet logged in!");
        localStorage.setItem("userId", res[0].id);
        this.router.navigate(['/snippets']);
      } else {
        alert("Wrong login data!")
      }
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }

  register() {
    this.router.navigate(["/register"]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"])
  }
}
