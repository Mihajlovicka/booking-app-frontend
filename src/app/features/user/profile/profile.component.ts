import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  selectedTab: string = 'basicInfo';
  resetTab(): void {
    this.selectedTab = 'basicInfo';
  }
}
