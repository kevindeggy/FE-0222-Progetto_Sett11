import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/prodotti';
import { ServiceCartService } from '../services/service-cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
  <ng-container *ngIf="!orderSend">
 <div class="card text-center">
  <div class="card-header">
    Cart <i class="bi bi-apple"></i> Products
  </div>
  <div class="w-50 mx-auto mt-5">
    <ul class="list-group">
      <li *ngFor="let item of cart" class="list-group-item d-flex justify-content-between">
        <span>- {{item.name | uppercase}} </span>
        <span> {{item.price | currency: 'EUR'}} <button (click)="removeProduct(item)" class="btn btn-danger"> <i class="bi bi-x-circle-fill "></i></button></span>
      </li>
      <li *ngIf="cart.length" class="list-group-item bg-dark text-white d-flex justify-content-between">
        <span>Total Order: </span>
        <span>{{sumPrice | currency: 'EUR'}}</span>
      </li>
    </ul>
  </div>
  <button *ngIf="!continuedToBuy && cart.length" (click)="continuedToBuyProds()" class="btn btn-primary w-25 mx-auto mt-3">Continued Order</button>
  <form *ngIf="cart.length && continuedToBuy" class="w-25 mx-auto mt-5" (ngSubmit)="submitOrder(formOrder, content)" #formOrder="ngForm">
    <div class="form-group">
    <label for="name">Insert your Name - min.3 letters</label>
    <input type="text" id="name" ngModel name="name" required pattern="^[a-zA-Z ]{3,16}$" class="form-control">
    </div>
    <div class="form-group">
    <label for="surname">Insert your Surname - min.3 letters</label>
    <input type="text" id="surname" ngModel name="surname" required pattern="^[a-zA-Z ]{3,16}$" class="form-control">
    </div>
    <div class="form-group">
    <label for="andress">Insert your Andress</label>
    <input type="text" id="andress" ngModel name="andress" required class="form-control">
    </div>
    <div class="form-group">
    <label for="shipping">Type of Shipping: </label>
    <select type="select" id="shipping" ngModel name="shipping" required class="from-control mt-3 mx-2">
      <option value="slow">Slow Shipping - €9.99</option>
      <option value="fast">Fast Shipping - €19.99</option>
    </select>
    </div>
    <button class="btn btn-primary mt-3" [disabled]="formOrder.invalid" type="submit">Buy</button>
  </form>
  <p *ngIf="!cart.length">--- Empty Cart ---</p>
  </div>
  </ng-container>

  <ng-container *ngIf="orderSend">
  <div class="container-fluid p-5 text-center">
      <h2 class="title">Thanks for your Order</h2>
      <p>Hello {{formResult.surname}} {{formResult.name}},</p>
      <p>We're so happy for your Order!</p>
      <p>Total of your Order: {{sumPrice + priceOfShipping(formResult.shipping) | currency: 'EUR'}}</p>
      <p>Products: {{sumPrice | currency: 'EUR'}} and shipping: {{priceOfShipping(formResult.shipping) | currency: 'EUR'}}</p>
      <p>The Order will be in {{formResult.andress}} with a {{formResult.shipping}} shipping</p>
      <p>See you! Bye</p>
  <a [routerLink]='["/"]' class="btn btn-primary">Go To Home</a>
  </div>
  </ng-container>

  <!-- My Modal -->
  <ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Order in shipping..</h4>
    <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
      <div class="mb-3">
        <p>Order Send!</p>
      </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="modal.close('Save click')">Close</button>
  </div>
</ng-template>

  `,
  styles: [
    `
input.ng-invalid.ng-touched {
  border: 2px dotted red;
}
    `]
})
export class CarrelloComponent implements OnInit {

  cart: ProductModel[] = [] //my cartArray
  sumPrice: number = 0; //sum of products in my cart
  formResult: { name: string, surname: string, andress: string, shipping: string } = { name: '', surname: '', andress: '', shipping: '' };//result of my form, starting empty
  orderSend!: boolean; //variable to show something
  continuedToBuy: boolean = false; //variable to show something

  constructor(private srvCart: ServiceCartService, private modalSrv: NgbModal) { } //import NgbModal for Modal

  submitOrder(form: any, content: any) {
    this.formResult.name = form.value.name; //get fromResult proprieties like form proprieties
    this.formResult.surname = form.form.value.surname;
    this.formResult.andress = form.form.value.andress;
    this.formResult.shipping = form.form.value.shipping;
    this.orderSend = true; //change the variable for show something
    this.srvCart.resetCart(); //reset my Cart
    this.cart = []; //reset my cart Array
    this.open(content); //call my function with content (modal) to open
  }

  //function for open my modal
  open(content: any) {
    this.modalSrv.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  removeProduct(product: ProductModel) {
    this.srvCart.removeProductInCart(product); //call function with product to remove
    this.sumPrice -= product.price; //degree the sum
    product.quantity++;
    this.srvCart.putChangeProductsInDatabase(product.id, product).subscribe();
  }

  continuedToBuyProds() {
    this.continuedToBuy = true; //open the form to checkout order
  }

  priceOfShipping(shipping: string): number {
    if (shipping === 'slow') {
      return 9.99
    } else {
      return 19.99
    }
  }

  ngOnInit(): void {
    this.orderSend = false;
    this.cart = this.srvCart.getProductsCart() //get all products that I've in my Cart
    for (let i = 0; i < this.cart.length; i++) { //cicle for add money on sumPrice
      this.sumPrice += this.cart[i].price;
    }
  }

}
// Kevin De Girolamo's Code
