import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ProfileComponent } from './components/profile/profile.component';
import { SnippetsComponent } from './components/snippets/snippets.component';
import { ReplacePipe } from './replace.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GeneratorComponent,
    ProfileComponent,
    SnippetsComponent,
    ReplacePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbNavModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
