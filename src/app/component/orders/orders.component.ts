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
        console.log(this.orders)
      }
    })
  }

  getTotal(id:number){
    let order = this.orders.find((order)=>order.id === id)!;
    let total:number = order.orderedItems.reduce((sum,item)=>sum+=item.price,0);
    return total;
  }
  getStatus(id:number):String{
    let status = this.orders.find((order)=>order.id === id)?.orderStatus!;
    if(status === "Out For Delivery"){
      return "OutForDelivery"
    }else{
      return status;
    }
  }

}
