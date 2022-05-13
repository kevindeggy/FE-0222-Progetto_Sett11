import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //with this I can do HTTP calls
import { ProductModel } from '../models/prodotti';

@Injectable({
  providedIn: 'root'
})

export class ServiceProdService {
  urlServer: string = 'http://localhost:4201' //my server's url

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<ProductModel[]>(`${this.urlServer}/products`); //get all products
  }
  getDetailsProduct(idProduct: number) {
    return this.http.get<ProductModel>(`${this.urlServer}/products/${idProduct}`); //get details of one product that I call with idProduct
  }

}
// Kevin De Girolamo's Code
