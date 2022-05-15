import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/prodotti';
import { ServiceProdService } from '../services/service-prod.service';

@Component({
  template: `
    <div class="card text-center">
      <div class="card-header">Apple <i class="bi bi-apple"></i> Accessories</div>
    </div>
    <div *ngIf="!loading" class="container-fluid text-center">
      <img class="w-50 mx-auto" src="https://25.media.tumblr.com/b5d97f1c29140b44d023b87ce17acdcd/tumblr_mkv6agM7Ch1rpjihyo1_1280.gif" />
    </div>
    <ng-container *ngIf="loading">
      <div class="container-fluid d-flex p-5 row-cols-4 flex-wrap mb-5">
        <div *ngFor="let product of productsArray" class="card mx-3 my-3 col" style="width: 18rem;">
          <img src="{{ product.urlImage }}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ product.name | uppercase }}</h5>
            <p class="card-text fs-3">{{ product.price | currency: "EUR" }}</p>
            <p class="card-text">Products Available: {{ product.quantity }}</p>
            <p class="card-text">{{ product.description }}</p>
            <a [routerLink]="['/prodotto', product.id]" class="btn btn-primary">Go Details</a>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class AccessoriesComponent implements OnInit {
  productsArray: ProductModel[] = [];
  loading: boolean = false;

  constructor(private srvProd: ServiceProdService) { }

  ngOnInit(): void {
    this.srvProd.getProducts().subscribe((ris) => {
      this.productsArray = ris.filter((x) => x.id > 7 && x.id < 11);
      this.loading = true;
    }); //escamotage for view only mac products
  }
}
