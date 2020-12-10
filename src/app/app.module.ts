import { WebRequestService } from './web-request.service';
import { ReservationCallService } from './reservation-call.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ReservationsComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ReservationCallService,
    WebRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
