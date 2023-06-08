import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  isLoggedIn(): boolean {
    return localStorage.getItem("userId") ? true : false;
  }
}
