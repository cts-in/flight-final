import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CarrierService {
  constructor (private http: HttpClient) {}

  getCarrier() {
   return this.http.get('http://192.168.1.62:8080/incs/get/data/by/carrier');
   }

  getCarrier1() {
   this.http.get('http://192.168.1.62:8080/incs/get/data/by/carrier').subscribe((response) => console.log(response));
  }
}