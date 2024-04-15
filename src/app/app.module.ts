import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './products/product/product.component';
import { PrivacyComponent } from './minicomponents/privacy/privacy.component';
import { FooterComponent } from './minicomponents/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { NewSubscriptionComponent } from './subscription/new-subscription/new-subscription.component';
import { ProductsGridComponent } from './products/products-grid/products-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ModalComponent,
    ProductComponent,
    PrivacyComponent,
    FooterComponent,
    HomeComponent,
    ArticleComponent,
    ProductDetailsComponent,
    SubscriptionComponent,
    NewSubscriptionComponent,
    ProductsGridComponent
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
