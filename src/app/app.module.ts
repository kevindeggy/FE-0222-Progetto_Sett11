import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar.component';
import { HomeComponent } from './pages/home.component';
import { FooterComponent } from './components/footer.component';
import { ProdottoComponent } from './pages/prodotto.component';
import { CarrelloComponent } from './pages/carrello.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProdottiComponent } from './pages/prodotti.component';
import { IphoneComponent } from './pages/iphone.component';
import { MacComponent } from './pages/mac.component';
import { AccessoriesComponent } from './pages/accessories.component';

// My routes app
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'prodotti',
    component: ProdottiComponent
  },
  {
    path: 'iphone',
    component: IphoneComponent
  },
  {
    path: 'mac',
    component: MacComponent
  },
  {
    path: 'accessories',
    component: AccessoriesComponent
  },
  {
    path: 'prodotto/:id',
    component: ProdottoComponent
  },
  {
    path: 'carrello',
    component: CarrelloComponent
  },
  {
    path: '**', //when I write somenthing wrong
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ProdottoComponent,
    CarrelloComponent,
    ProdottiComponent,
    IphoneComponent,
    MacComponent,
    AccessoriesComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// Kevin De Girolamo's Code
