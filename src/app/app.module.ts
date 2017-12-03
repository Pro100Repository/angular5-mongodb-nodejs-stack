import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

//Services
import { MainService } from './main.service';
import { LoginComponent } from './login/login.component';
import { ContactsComponent } from './contacts/contacts.component';


const appRoutes: Routes = [
  { path: '', component: DefaultComponent, pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacts', component: ContactsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    DefaultComponent,
    LoginComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
