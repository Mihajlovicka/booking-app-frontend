import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from '../core/core.module';
import { PopupComponent } from './popup/popup.component';
import { PeriodDialogComponent } from './period-dialog/period-dialog.component';



@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    PopupComponent,
    PeriodDialogComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    HomePageComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
