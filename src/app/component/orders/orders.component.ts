import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orders: Order[] = []
  constructor(private orderService:OrderService,private storageService:StorageService){}
  ngOnInit(): void {
    this.orderService.getOrders(this.storageService.getLoggedInUser().id).subscribe({
      next: (resp:any)=>{
        this.orders = resp.data
      }
    })
  }

}
