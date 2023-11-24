import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  status:number=0;
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (resp:any) =>{
        this.orders = resp.data
      }
    })
  }
  setStatus(id:number):void{
    let statusReq = {
      orderId:id,
      statusId:this.status
    }
    this.orderService.setStatus(statusReq).subscribe({
      next: (res:any) =>{
        console.log(res);
      }
    })
  }
}
