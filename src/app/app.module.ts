import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './features/user/user.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // For [(ngModel)] if needed
import { ChangeInfoComponent } from './features/user/profile/change-info/change-info.component';
import { ChangePasswordComponent } from './features/user/profile/change-password/change-password.component';
import { ProfileComponent } from './features/user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ChangeInfoComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
