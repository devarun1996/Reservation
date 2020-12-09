import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationCallService {

  constructor(private webReq: WebRequestService) { }

  registerOwner(name: string, userName: string, password: string, restaurant: string){
    return this.webReq.register("register", { name, userName, password, restaurant });
  }

  loginOwner(userName: string, password: string){
    return this.webReq.login('login', { userName, password });
  }

  getOwner(){
    return this.webReq.get("owner");
  }

  getOwnerById(ownerId: string){
    return this.webReq.get(`owner/${ownerId}`);
  }

  createReservation(name: string, people: number, time: string, ownerId: string){
    return this.webReq.post(`owner/${ownerId}/reservation`, { name, people, time });
  }

  getReservation(ownerId: string){
    return this.webReq.get(`owner/${ownerId}/reservation`);
  }
   
  getOneReservation(ownerId: string, reservationId: string){
    return this.webReq.get(`owner/${ownerId}/reservation/${reservationId}`);
  } 

  editReservation(ownerId: string, reservationId: string, name: string, people: number, time: string){
    return this.webReq.patch(`owner/${ownerId}/reservation/${reservationId}`, {name, people, time});
  }

  deleteReservation(ownerId: string, reservationId: string){
    return this.webReq.delete(`owner/${ownerId}/reservation/${reservationId}`);
  }

}
