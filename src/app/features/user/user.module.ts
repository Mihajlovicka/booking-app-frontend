import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, CoreModule, UserRoutingModule],
})
export class UserModule {}
