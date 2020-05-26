import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignComponent } from './sign/sign.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalImportModule} from './shared/global-import.module';
import {MaterialModule} from './shared/material.module';
import {MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SignUpComponent} from './sign/sign-up/sign-up.component';
import { FooterComponent } from './home/source/footer/footer.component';
import { ProfileComponent } from './home/source/profile/profile.component';
import { CatalogComponent } from './home/catalog/catalog.component';
import { CatalogOneComponent } from './home/catalog/catalog-one/catalog-one.component';
import {HeaderComponent} from './home/source/header/header.component';
import { ContactsComponent } from './home/contacts/contacts.component';
import { AboutOneProductComponent } from './home/about-one-product/about-one-product.component';
// import {homeRoutes} from './home/home.module';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
      {path: '', redirectTo: 'catalog', pathMatch: 'full'},
      {path: 'catalog', component: CatalogComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'contacts', component: ContactsComponent},
      {path: 'one-product', component: AboutOneProductComponent}
    ]},
  {path: 'sign', component: SignComponent, children: [
      {path: '', redirectTo: 'in', pathMatch: 'full'},
      {path: 'in', component: SignInComponent},
      {path: 'up', component: SignUpComponent}
    ]},
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    CatalogComponent,
    CatalogOneComponent,
    ContactsComponent,
    AboutOneProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GlobalImportModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
