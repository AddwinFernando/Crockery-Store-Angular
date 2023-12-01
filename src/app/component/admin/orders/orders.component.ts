import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  status: number = 0;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (resp: any) => {
        this.orders = resp.data;
      },
    });
  }
  setStatus(sel:any,id:number): void {
    console.log(sel.target.value);
    
    let statusReq = {
      orderId: id,
      statusId: sel.target.value,
    };
    this.orderService.setStatus(statusReq).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }
}
