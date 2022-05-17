import { Component, OnInit } from '@angular/core';
import { ServiceCartService } from '../services/service-cart.service';

@Component({
  selector: "app-navbar",
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-evenly">
      <div class="cointener-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarToggler" aria-expanded="false" aria-controls="navbarToggler" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
          <a class="navbar-brand mx-5" href="javascript:void(0)"><i class="bi bi-apple"></i> Apple Store</a>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" [routerLink]="['/']" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" [routerLink]="['/prodotti']" routerLinkActive="active">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" [routerLink]="['/iphone']" routerLinkActive="active">iPhone</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" [routerLink]="['/mac']" routerLinkActive="active">Mac</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" [routerLink]="['/accessories']" routerLinkActive="active">Accessories</a>
            </li>
          </ul>
        </div>
      </div>
      <a class="nav-link" aria-current="page" [routerLink]="['/carrello']" routerLinkActive="active"
        ><button type="button" class="btn bg-secondary position-relative">
          <i class="bi bi-bag"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-dark">{{ countCart }}</span>
        </button></a
      >
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  countCart: number = 0;

  constructor(private srvCart: ServiceCartService) { }

  ngOnInit(): void {
    this.srvCart.subBadgeNum.subscribe((res) => {
      this.countCart = res;
    }); //subscrive my badge number on subject's service
  }
}
// Kevin De Girolamo's Code
