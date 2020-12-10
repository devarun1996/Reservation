import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: "register", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "reservations/:ownerId", component: ReservationsComponent},
  {path: "reservations/:ownerId/edit/:reservationId", component: EditComponent},
  {path: "reservations/:ownerId/add", component: AddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
