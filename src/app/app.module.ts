import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './products/product/product.component';
import { PrivacyComponent } from './minicomponents/privacy/privacy.component';
import { FooterComponent } from './minicomponents/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { OrderComponent } from './order/order.component';
import { MealpickerComponent } from './minicomponents/mealpicker/mealpicker.component';
import { MealpickerPopupComponent } from './minicomponents/mealpicker/mealpicker-popup/mealpicker-popup.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductListItemComponent } from './products/product-list-item/product-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ModalComponent,
    ProductComponent,
    PrivacyComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    OrderComponent,
    MealpickerComponent,
    MealpickerPopupComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    ProductListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue:'NGN'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
