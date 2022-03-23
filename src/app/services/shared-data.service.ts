import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Note: BehaviourSubject rxjs operator can be used to detect the changed values in consumer class 
  // but for this application it is not required, hence used plain property.
  public selectedCustomer?: Customer;
  constructor() { }

}
