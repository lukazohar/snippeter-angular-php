import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  apiUrl = "http://localhost/index.php";
  profileForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    username: new FormControl(),
    email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("", [Validators.minLength(5), Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.http.get(`${this.apiUrl}/user/get?id=${localStorage.getItem("userId")}`).subscribe((res: any) => {
      if (res != null) {
        this.profileForm.get("id")?.setValue(res[0].id);
        this.profileForm.get("firstName")?.setValue(res[0].firstName);
        this.profileForm.get("lastName")?.setValue(res[0].lastName);
        this.profileForm.get("username")?.setValue(res[0].username);
        this.profileForm.get("email")?.setValue(res[0].email);
        this.profileForm.get("password")?.setValue(res[0].password);
      } else {
        alert("User not found!")
        console.log("User not found");
      }
    });
  }

  editProfile() {
    if (!this.profileForm.get("email")?.valid) {
      alert("Error in Email!")
      return;
    }
    if (!this.profileForm.get("password")?.valid) {
      alert("Error in Password!\n- minimun lenght: 5\n- must contain letters (both uppercase and lowercase) and numbers");
      return;
    }

    this.http.put(`${this.apiUrl}/user/edit`, this.profileForm.value).subscribe((res: any) => {
      if (res != null && res != -1) {
        alert("Snippet successfully edited!")
        console.log("Successfully edited!");
      } else {
        alert("Error updating user!");
      }
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['/login'])
  }

  deleteProfile() {
    this.http.delete(`${this.apiUrl}/user/edit?id=` + this.profileForm.get("id")?.value).subscribe((res: any) => {
      if (res != null && res != -1) {
        console.log("Successfully Deleted!");
        this.router.navigate(["login"]);
      } else {
        alert("Error updating user!");
      }
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }

}
