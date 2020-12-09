import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  url;
  headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') // token already is in format 'Bearer f2e3kv1e...'
   })
  
  constructor(private http: HttpClient) { 
    this.url = "http://localhost:3000";
  }

  login(uri: string, payload: Object){       // no headers as no web token needed
    return this.http.post(`${this.url}/${uri}`, payload);
  }
  
  register(uri: string, payload: Object){    // no headers as no web token needed
    return this.http.post(`${this.url}/${uri}`, payload);
  }

  get(uri: string){
    return this.http.get(`${this.url}/${uri}`, { headers: this.headers });
  }

  post(uri: string, payload: Object){
    return this.http.post(`${this.url}/${uri}`, payload, { headers: this.headers });
  }

  patch(uri: string, payload: Object){
    return this.http.patch(`${this.url}/${uri}`, payload, {responseType: 'text', headers: this.headers} ); //mention response-type as issue-> HttpClient “Http failure during parsing”
  }

  delete(uri: string){
    return this.http.delete(`${this.url}/${uri}`,{ headers: this.headers });
  }
}
