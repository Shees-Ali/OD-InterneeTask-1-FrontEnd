import { Component } from '@angular/core';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLoader: boolean = false;
  constructor(public utilityService: UtilityService) {
    // Logic for showing and hiding loader, subscribes to the Subject in utlity service, which is updated on API calls.
    utilityService.isLoading.subscribe((res) => {
      this.showLoader = res;
    });
  }
}
