import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { Item } from 'src/app/model/item';
import { Cart } from 'src/app/model/cart';
import { StorageService } from 'src/app/service/storage.service';
import { CartResp } from 'src/app/model/cart-resp';
import { count } from 'rxjs';
import { urlEndpoint } from 'src/app/utils/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  Items: Item[] = [];
  UserCart: CartResp[] = [];
  constructor(
    private homeService: HomeService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.storageService.setCartCount(this.getCartCount())
    this.homeService.getProducts().subscribe({
      next: (response: any) => {
        this.Items = response.data.items;
      },
    });
    this.homeService
      .getUserCart(this.storageService.getLoggedInUser().id)
      .subscribe({
        next: (resp: any) => {
          this.UserCart = resp.data;
          console.log(this.UserCart);
        },
      });
  }

  getButtonText(id:number):String{
    let Stock:number = this.Items.find((item)=>item.id===id)?.stock!;
    if(Stock === 0){
      return "Out of Stock"
    } else{
      return "Add to Cart"
    }
  }

  getPhoto(id:number):String{
    return `${urlEndpoint.baseUrl}/download/${id}`
  }

  getCartItemCount(id: number): number {
    let count: number = this.UserCart.find(
      (cartItem) => cartItem.item.id === id
    )?.count!;

    return count;
  }

  addToCart(id: number): void {
    let isPresent: Item = this.UserCart.find((item) => item.item.id === id)
      ?.item!;
    console.log(isPresent);

    if (!this.UserCart.find((item) => item.item.id === id)) {
      console.log('Added 1');

      let Cart: Cart = {
        userId: this.storageService.getLoggedInUser().id,
        itemId: id,
        count: 1,
      };
      this.homeService.addToCart(Cart).subscribe({
        next: (resp: any) => {
          this.UserCart = resp.data;
          console.log(this.UserCart);
        },
      });
    } else {
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
  }

  removeFromCart(id: number): void {
    if ((this.getCartItemCount(id)-1) === 0) {
      let cartId:number = this.UserCart.find((cartItem)=>cartItem.item.id===id)?.id!;
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
  getCartCount():number{
    let count=this.UserCart.reduce((num,item)=>num+item.count,0);
    return count;
  }
}
