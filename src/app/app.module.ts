import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppFormComponent } from './app-form/app-form.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LocationService} from './app-form/getlocation.service';
import { PlaceTableComponent } from './app-form/place-table/place-table.component';
import { HeaderComponent } from './app-form/header/header.component';
import { FavoriteTableComponent } from './app-form/favorite-table/favorite-table.component';
import { DetailPageComponent } from './app-form/detail-page/detail-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AppFormComponent,
    PlaceTableComponent,
    HeaderComponent,
    FavoriteTableComponent,
    DetailPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
