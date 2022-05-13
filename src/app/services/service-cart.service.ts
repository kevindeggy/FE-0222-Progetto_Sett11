import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from '../models/prodotti';

@Injectable({
  providedIn: 'root'
})
export class ServiceCartService {
  cartProds: ProductModel[] = [] //array of my cart, starting empty
  cartProdId!: any;
  badgeCart: number = 0; //variable of Cart's badge
  subBadgeNum = new Subject<number>() //create a subject for my badge

  constructor(private http: HttpClient) { }

  getProductsCart() {
    return this.cartProds; //return in my component the refresh Cart Array
  }
  setNewProductToCart(prod: ProductModel) {
    this.cartProds.push(prod); //push in my cart the product selected to add it
    this.badgeCart = this.cartProds.length; //refresh badge number
    this.subBadgeNum.next(this.badgeCart); //set badge number on subject
  }
  resetCart() {
    this.cartProds = []; //reset my Cart Array
    this.badgeCart = 0; //reset my badge number
    this.subBadgeNum.next(this.badgeCart); //reset badge number on subject
  }
  removeProductInCart(ProdToRemove: ProductModel) {
    this.cartProdId = this.cartProds.indexOf((ProdToRemove))
    console.log(this.cartProdId)
    this.cartProds.splice(this.cartProdId, 1);
    this.badgeCart = this.cartProds.length; //refresh badge number
    this.subBadgeNum.next(this.badgeCart); //set badge number on subject
  }
  putChangeProductsInDatabase(id: number, product: ProductModel) { //change the quantity in the DataBase
    const body = JSON.stringify(product)
    const urlPut = 'http://localhost:4201/products/' + id;
    const headersPut = { 'content-type': 'application/json' }
    return this.http.put<any>(urlPut, body, { headers: headersPut })
  }
}
// Kevin De Girolamo's Code
