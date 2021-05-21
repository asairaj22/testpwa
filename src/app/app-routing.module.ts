import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { WelcomePageComponent } from '../app/welcome-page/welcome-page.component'

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "welcome", component: WelcomePageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
