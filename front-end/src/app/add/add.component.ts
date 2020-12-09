import { ReservationCallService } from './../reservation-call.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  time: string="";
  ownerId: string;
  hrs: string="";
  mins: string="";

  constructor(
    private reservationCall: ReservationCallService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((par) => {

      this.ownerId = par.ownerId;
    })
  }


  add(name: string, hrs: string, mins: string, people: number){

    if(hrs.length === 1){
      this.hrs = "0" + hrs;
    }
    else{
      this.hrs = hrs;
    }
    if(mins.length === 1){
      this.mins = "0" + mins;
    }
    else{
      this.mins = mins;
    }
    this.time = this.hrs + ":" + this.mins;
    console.log(name, people, this.time, this.ownerId);
    this.reservationCall.createReservation(name, people, this.time, this.ownerId).subscribe((res) => {

      console.log(res);
      this.router.navigate(['/reservations', this.ownerId]);
    });
  }
  
}
