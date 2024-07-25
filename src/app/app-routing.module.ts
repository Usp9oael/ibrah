import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { MessagesComponent } from '././dashboard/messages/messages.component';
import { UsersComponent } from './dashboard/users/users.component';
import { CreateUserComponent } from './children/create-user/create-user.component';
import { UpdateUserComponent } from './children/update-user/update-user.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserDetailsComponent } from './shared/usersdetails/usersdetails.component';
import { NewsComponent } from './dashboard/news/news.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';
import { WithdrawComponent } from './dashboard/withdraw/withdraw.component';
import { AuthGuard } from './service/auth/auth.guard';

const routes: Routes = [
  // Default redirect to login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Routes under the AuthLayoutComponent
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },

  // Routes under the DashboardLayoutComponent
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } ,  canActivate: [AuthGuard]},
      { path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Profile' } },
      { path: 'withdrawal_requests', component: WithdrawComponent, data: { breadcrumb: 'Withdrawal Requests' } },
      { path: 'analytics', component: AnalyticsComponent, data: { breadcrumb: 'Analytics' } },
      { path: 'products', component: ProductsComponent, data: { breadcrumb: 'Products' } },
      { path: 'messages', component: MessagesComponent, data: { breadcrumb: 'Messages' } },
      { path: 'news', component: NewsComponent, data: { breadcrumb: 'News' } },
      { path: 'transactions', component: TransactionsComponent, data: { breadcrumb: 'Transactions' } },

      // Routes under the UserLayoutComponent
      {
        path: 'users',
        component: UserLayoutComponent,
        data: { breadcrumb: 'Users' },
        children: [
          { path: '', component: UsersComponent, data: { breadcrumb: '' } },
          { path: 'create_user', component: CreateUserComponent, data: { breadcrumb: 'Create User' } },
          { path: 'update_user/:id', component: UpdateUserComponent, data: { breadcrumb: 'Update User' } },
          { path: 'view-user/:id', component: UserDetailsComponent, data: { breadcrumb: 'View User'} },
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
