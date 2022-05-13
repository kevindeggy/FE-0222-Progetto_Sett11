import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../models/prodotti';
import { ServiceCartService } from '../services/service-cart.service';
import { ServiceProdService } from '../services/service-prod.service';

@Component({
  template: `
   <div class="card text-center">
  <div class="card-header">
    Product <i class="bi bi-apple"></i> Details
  </div>
  <div class="card-body d-flex justify-content-center">
    <div class="w-25">
  <img src={{productSelected.urlImage}} class="card-img-top" alt="...">
  </div>
  <div class="my-auto">
    <h5 class="card-title">{{productSelected.name | uppercase}}</h5>
    <p *ngIf="loading" class="card-text fs-3">{{productSelected.price | currency: 'EUR'}}</p>
    <p class="card-text">{{productSelected.description}}</p>
    <p *ngIf="productSelected.quantity > 0" class="card-text">Products Available: {{productSelected.quantity}}</p>
    <p *ngIf="productSelected.quantity < 1 && loading" class="card-text text-danger">Product not Available</p>
    <button *ngIf="loading" (click)="addToCart()" [disabled]="productSelected.quantity < 1" class="btn btn-primary">Add to Cart</button>
    </div>
  </div>
</div>

<ng-container *ngIf="addToCartLoad">
  <p class="bg-secondary p-3 w-50 mx-auto mt-3 text-dark text-center">
  {{productSelected.name | uppercase}} added to Cart!
  </p>
</ng-container>

  `,
  styles: [
  ]
})
export class ProdottoComponent implements OnInit {
  productIdSelected!: number //id that I have selected
  productSelected: ProductModel = { //product that I show with my Id selected, at starting is on waiting status
    id: 0,
    name: "waiting...",
    price: 0,
    description: "waiting...",
    quantity: 0,
    urlImage: 'https://25.media.tumblr.com/b5d97f1c29140b44d023b87ce17acdcd/tumblr_mkv6agM7Ch1rpjihyo1_1280.gif'
  }
  loading: boolean = false //variable of loading
  addToCartLoad: boolean = false;

  constructor(private srvProd: ServiceProdService, private srvCart: ServiceCartService, private router: ActivatedRoute) { }

  addToCart() {
    this.srvCart.setNewProductToCart(this.productSelected);
    this.productSelected.quantity--;
    this.srvCart.putChangeProductsInDatabase(this.productSelected.id, this.productSelected).subscribe();

    this.addToCartLoad = true
    setTimeout(() => {
      this.addToCartLoad = false
    }, 1500)
  }

  ngOnInit(): void {
    this.productIdSelected = this.router.snapshot.params['id']; //get id selected

    this.srvProd.getDetailsProduct(this.productIdSelected).subscribe((ris) => { //call my getFunction that return my product with my id selected
      this.productSelected = ris
      this.loading = true //loading terminate
    })
  }

}
