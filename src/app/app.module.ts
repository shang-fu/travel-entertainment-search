import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppFormComponent } from './app-form/app-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './app-form/getlocation.service';
import { PlaceTableComponent } from './app-form/place-table/place-table.component';
import { HeaderComponent } from './app-form/header/header.component';
import { FavoriteTableComponent } from './app-form/favorite-table/favorite-table.component';
import { DetailPageComponent } from './app-form/detail-page/detail-page.component';
import { AgmCoreModule} from '@agm/core';
import { DetailHeaderComponent } from './app-form/detail-page/detail-header/detail-header.component';
import { DetailInfoComponent } from './app-form/detail-page/detail-info/detail-info.component';
import { DetailPhotoComponent } from './app-form/detail-page/detail-photo/detail-photo.component';
import { DetailMapComponent } from './app-form/detail-page/detail-map/detail-map.component';
import { DetailReviewComponent } from './app-form/detail-page/detail-review/detail-review.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AppFormComponent,
    PlaceTableComponent,
    HeaderComponent,
    FavoriteTableComponent,
    DetailPageComponent,
    DetailHeaderComponent,
    DetailInfoComponent,
    DetailPhotoComponent,
    DetailMapComponent,
    DetailReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB2yS5yyo3DWDoKJ6GSIs4Lr7AsMvVqtHQ",
      libraries: ["places"]
    })
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
