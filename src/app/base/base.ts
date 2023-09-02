import { Injector } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { FormBuilder } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';
import { Router } from '@angular/router';

// Base Class containing all services for the app
export abstract class BasePage {
  public formBuilder: FormBuilder;
  public utility: UtilityService;
  public network: NetworkService;
  public router: Router;

  constructor(injector: Injector) {
    this.formBuilder = injector.get(FormBuilder);
    this.utility = injector.get(UtilityService);
    this.network = injector.get(NetworkService);
    this.router = injector.get(Router);
  }
}
