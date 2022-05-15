import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="card text-center">
      <div class="card-header">Apple <i class="bi bi-apple"></i> Store</div>
    </div>
    <div class="container-fluid d-flex p-5 mb-5">
      <div class="col-md-5 p-lg-5 mx-auto my-5">
        <h1 class="display-4 fw-normal"><i class="bi bi-apple"></i> Apple</h1>
        <p class="lead fw-normal">
          Stay hungry, Stay foolish! <br />
          <cite>- Steve Jobs</cite> <br /><br />
          Welcome! <br />
          This is the new Apple Store
        </p>
        <a class="btn btn-outline-secondary" [routerLink]="['/prodotti']">Go to Products</a>
      </div>
      <div class="product-device shadow-sm d-none d-md-block">
        <img src="https://www.apple.com/v/iphone/home/be/images/overview/hero/iphone_13_pro_hero__gqclakbze4a6_large.png" alt="" />
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
