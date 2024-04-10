import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrivacyComponent } from './minicomponents/privacy/privacy.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about/privacy", component: PrivacyComponent },
  { path: "articles/balanced-diet-and-the-five-food-groups", component: ArticleComponent },
  { path: "subscribe", component: SubscriptionComponent, title: "Subscribe to a Food Plan" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
