import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { UsersComponent } from './dashboard/users/users.component';
import { CreateUserComponent } from './children/create-user/create-user.component';
import { UpdateUserComponent } from './children/update-user/update-user.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

const routes: Routes = [
  //  step 1: change the redirectTo from "dashboard/home" to "login"
  { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    // Step 2: uncomment the line below to acces the login and register auth page
    // children: [
    //   { path: 'login', component: LoginComponent },
    //   { path: 'register', component: RegisterComponent },
    // ],
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'dashboard/home', component: HomeComponent, data: { breadcrumb: 'Home' } },
      { path: 'dashboard/profile', component: ProfileComponent, data: { breadcrumb: 'Profile' } },
      { path: 'dashboard/settings', component: SettingsComponent, data: { breadcrumb: 'Settings' } },
      { path: 'dashboard/analytics', component: AnalyticsComponent, data: { breadcrumb: 'Analytics' } },
      { path: 'dashboard/products', component: ProductsComponent, data: { breadcrumb: 'Products' } },
      { path: 'dashboard/messages', component: MessagesComponent, data: { breadcrumb: 'Messages' } },
      { 
        path: 'dashboard/users', 
        component: UserLayoutComponent,
        data: { breadcrumb: 'Users' },
        children: [
          { path: '', component: UsersComponent, data: { breadcrumb: '' } },
          { path: 'create_user', component: CreateUserComponent, data: { breadcrumb: 'Create User' } },
          { path: 'update_user', component: UpdateUserComponent, data: { breadcrumb: 'Update User' } },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
