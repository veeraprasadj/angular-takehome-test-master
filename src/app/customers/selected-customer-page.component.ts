import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppDataApiService } from '../app-data/app-data-api.service';
import { Customer } from '../models/customer.interface';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  templateUrl: './selected-customer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedCustomerPageComponent implements OnInit{

  selectedCustomer?: Customer;
  constructor(private appDataService: AppDataApiService,
    private sharedDataService:SharedDataService){

  }

  ngOnInit(): void {
    this.selectedCustomer = this.sharedDataService.selectedCustomer;
  }

}
