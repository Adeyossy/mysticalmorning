import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrivacyComponent } from './minicomponents/privacy/privacy.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { NewSubscriptionComponent } from './subscription/new-subscription/new-subscription.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about/privacy", component: PrivacyComponent },
  { path: "articles/balanced-diet-and-the-five-food-groups", component: ArticleComponent },
  { path: "subscribe", component: SubscriptionComponent, 
    title: "Subscribe to Mystical Morning's Food Plan" },
  { path: "subscribe/new/steps", component: NewSubscriptionComponent, 
    title: "New Mystical Morning Food Plan", children: [
      // { path: "placeholder" }
    ] }
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
