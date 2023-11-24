import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartResp } from 'src/app/model/cart-resp';
import { Item } from 'src/app/model/item';
import { CartService } from 'src/app/service/cart.service';
import { HomeService } from 'src/app/service/home.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  UserCart: CartResp[] = [];

  constructor(
    private homeService: HomeService,
    private storageService: StorageService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.homeService
      .getUserCart(this.storageService.getLoggedInUser().id)
      .subscribe({
        next: (resp: any) => {
          this.UserCart = resp.data;
          console.log(this.UserCart);
        },
      });
  }

  getCartItemCount(id: number): number {
    let count: number = this.UserCart.find(
      (cartItem) => cartItem.item.id === id
    )?.count!;
    return count;
  }

  addToCart(id: number): void {
    console.log('working');

    let isPresent: Item = this.UserCart.find((item) => item.item.id === id)
      ?.item!;
    console.log(isPresent);
    console.log(
      this.UserCart.find((cartItem) => cartItem.item.id === id)?.count
    );

    let Cart: Cart = {
      userId: this.storageService.getLoggedInUser().id,
      itemId: id,
      count:
        this.UserCart.find((cartItem) => cartItem.item.id === id)?.count! + 1,
    };
    this.homeService.addToCart(Cart).subscribe({
      next: (resp: any) => {
        this.UserCart = resp.data;
        console.log(this.UserCart);
      },
    });
  }

  removeFromCart(id: number): void {
    if (this.getCartItemCount(id) - 1 === 0) {
      let cartId: number = this.UserCart.find(
        (cartItem) => cartItem.item.id === id
      )?.id!;
      this.homeService
        .removeFromCart(this.storageService.getLoggedInUser().id, cartId)
        .subscribe({
          next: (resp: any) => {
            this.UserCart = resp.data;
            console.log(this.UserCart);
          },
        });
    } else {
      console.log('Minus');

      let Cart: Cart = {
        userId: this.storageService.getLoggedInUser().id,
        itemId: id,
        count:
          this.UserCart.find((cartItem) => cartItem.item.id === id)?.count! - 1,
      };
      this.homeService.addToCart(Cart).subscribe({
        next: (resp: any) => {
          this.UserCart = resp.data;
          console.log(this.UserCart);
        },
      });
    }
  }

  checkout(): void{
    let checkOutData:any = {
      userId: this.storageService.getLoggedInUser().id,
      addressId:1
    }
    this.cartService.checkout(checkOutData).subscribe({
      next: (resp:any)=> console.log(resp)
    })
  }
}
