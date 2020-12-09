import { RouterModule } from '@angular/router';
import { ReservationCallService } from './../reservation-call.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: any;

  constructor(
    private reservationCall: ReservationCallService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login(userName: string, password: string){
    console.log(userName, password);
    this.reservationCall.loginOwner(userName, password).subscribe((res) => {
      
      console.log(res);
      this.data = res;
      
      if(this.data){

        localStorage.setItem("token", this.data.token);
        console.log(localStorage.getItem("token"))
        this.router.navigate([`/reservations/${this.data.owner_id}`]);
      }
    
    });
  }
}
