import { ReservationCallService } from './../reservation-call.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  ownerId: any;
  restaurant: string;
  reservations: any;
  empty: boolean = false;

  constructor(
    private reservationCall: ReservationCallService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((par) => {

      this.ownerId = par.ownerId;
    });

    this.reservationCall.getOwnerById(this.ownerId).subscribe((res: any) => {

      this.restaurant = res.restaurant;
    });

    this.reservationCall.getReservation(this.ownerId).subscribe((res:any) => {

      if(res.length === 0){
        console.log("empty")
        this.empty = true;
      }
      else{
        
        this.reservations = res;
      }
    });
  }

  delete(reservId: string){

    this.reservationCall.deleteReservation(this.ownerId, reservId).subscribe((res) => {

      //reloading....
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/reservations', this.ownerId]);
    });
  }

  logout(){
    
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

}
