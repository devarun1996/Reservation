import { ReservationCallService } from './../reservation-call.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  temp: string;
  time: string;
  hrs: string;
  mins: string;
  ownerId: string;
  reservationId: string;
  reservation: any;

  constructor(
    private reservationCall: ReservationCallService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((par) => {

      this.ownerId = par.ownerId;
      this.reservationId = par.reservationId;
    });

    this.reservationCall.getOneReservation(this.ownerId, this.reservationId).subscribe((res) => {

      this.reservation = res;
      this.temp = this.reservation.time.split(":");
      this.hrs = this.temp[0];
      this.mins = this.temp[1];
      
    });
  }

  edit(name: string, hrs: string, mins: string, people: number){

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
    this.reservationCall.editReservation(this.ownerId, this.reservationId, name, people, this.time).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/reservations', this.ownerId]);
      });
  }

}
