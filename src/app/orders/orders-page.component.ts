import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { AppDataApiService } from '../app-data/app-data-api.service';
import { Customer } from '../models/customer.interface';
import { Order } from '../models/order.interface';
import { Product } from '../models/product.interface';
import { map, shareReplay } from 'rxjs/operators';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  templateUrl: './orders-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent implements OnInit{

  orders$: Observable<Order[]>;
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  
  selectedCustomerId?: number;
  // data$ = combineLatest([this.orders$, this.customers$, this.products$]).pipe(
  //   map(([orders, customers, products]) => {
  //     return {
  //       orders,
  //       customers,
  //       products,
  //     };
  //   }),
  // );
 
  
  constructor(private appDataApiService: AppDataApiService,
    private sharedDataService: SharedDataService){
    this.orders$= this.appDataApiService.orders$.pipe(shareReplay());
    this.products$= this.appDataApiService.products$.pipe(shareReplay());
    this.customers$= this.appDataApiService.customers$.pipe(shareReplay());
  }


  ngOnInit(): void {
  }


  getCustomer(customerId: number, customers:Customer[]): Customer|undefined{
 
      return customers? customers.find(c => c.id === customerId): undefined;
  }

   getProduct(productId: number, products:Product[]): Product|undefined{

      return products? products.find(p => p.id === productId): undefined;
  }

  onSelectionChange(event: any, selectedCustomerId:string, customers: Customer[]){
   
    if(selectedCustomerId === ''){
      this.selectedCustomerId = undefined;
      this.sharedDataService.selectedCustomer = undefined;
    }
    else{
    this.selectedCustomerId =   parseInt(selectedCustomerId);
    this.sharedDataService.selectedCustomer = customers.find(c => c.id === this.selectedCustomerId);
    }
  }

   ordersFilter(orders:Order[]): Order[]{
     // if customer is not selected, it returns available orders without filter
     if(!this.selectedCustomerId)
     return orders;

     return orders.filter(o => o.customerId ===  this.selectedCustomerId)
   }

}
