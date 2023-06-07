import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private http: HttpClient, private router: Router) {

  }

  login() {
    this.http.post(`${this.apiUrl}/user/login`, this.loginForm.value).subscribe((res: any) => {
      if (res[0] != null) {
        console.log("Success");
        localStorage.setItem("userId", res[0].id);
        this.router.navigate(['/profile']);
      } else {
        alert("Wrong login data!")
      }
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }
}
