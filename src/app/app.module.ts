import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { UserDetailsService } from './user-details.service';
import { UserRoutingModule, RoutingComponents } from './/user-routing.module';
import { UserLocationComponent } from './user-location/user-location.component';


@NgModule({
  declarations: [
    AppComponent    
    , RoutingComponents
    , UserLocationComponent
  ],
  imports: [
    BrowserModule
    , HttpClientModule
    , UserRoutingModule
    , NgbModule
  ],
  providers: [UserDetailsService],
  entryComponents: [UserLocationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
