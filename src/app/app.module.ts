import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './features/user/user.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // For [(ngModel)] if needed
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccommodationsListComponent } from './features/accommodation/accommodations-list/accommodations-list.component';
import { ChangeInfoComponent } from './features/user/profile/change-info/change-info.component';
import { ChangePasswordComponent } from './features/user/profile/change-password/change-password.component';
import { ProfileComponent } from './features/user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AccommodationsListComponent,
    ProfileComponent,
    ChangeInfoComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    SharedModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
