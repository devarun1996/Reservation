import { ReservationCallService } from './../reservation-call.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signup: boolean = false;

  constructor(private reservationCall: ReservationCallService) { }

  ngOnInit(): void {
  }

  register(name:string, username:string, password:string, restaurant:string){

    this.reservationCall.registerOwner(name, username, password, restaurant).subscribe((res: any) => {

      console.log(res);

      if(res.success){
       this.signup = true;
      }
    });

  }

  remove(){

    this.signup = false;
  }

}
