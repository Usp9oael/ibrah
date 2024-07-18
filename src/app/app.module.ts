import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardNavComponent } from './shared/dashboard-nav/dashboard-nav.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { BreadcrumbsComponent } from './common/breadcrumbs/breadcrumbs.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { UsersComponent } from './dashboard/users/users.component';
import { MessagesComponent } from '././dashboard/messages/messages.component';
import { CreateUserComponent } from './children/create-user/create-user.component';
import { UpdateUserComponent } from './children/update-user/update-user.component';
import { UserViewComponent } from './children/user-view/user-view.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { HidePasswordPipe } from './pipes/hide-password.pipe';
import { CreateuserdialogComponent } from './shared/createuserdialog/createuserdialog.component';
import { MessageDialogComponent } from './shared/message-dialog/message-dialog.component';
import { UserDetailsComponent } from './shared/usersdetails/usersdetails.component';
import { NewsComponent } from './dashboard/news/news.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent,
    HomeComponent,
    ProfileComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    DashboardNavComponent,
    SidebarComponent,
    AnalyticsComponent,
    BreadcrumbsComponent,
    ProductsComponent,
    UsersComponent,
    MessagesComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserViewComponent,
    UserLayoutComponent,
    HidePasswordPipe,
    CreateuserdialogComponent,
    MessageDialogComponent,
    UserDetailsComponent,
    NewsComponent,
    FooterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
