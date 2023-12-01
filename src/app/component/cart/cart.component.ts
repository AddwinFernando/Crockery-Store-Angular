import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Address } from 'src/app/model/address';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { CartResp } from 'src/app/model/cart-resp';
import { Item } from 'src/app/model/item';
import { Stock } from 'src/app/model/stock';
import { CartService } from 'src/app/service/cart.service';
import { HomeService } from 'src/app/service/home.service';
import { ProfileService } from 'src/app/service/profile.service';
import { StorageService } from 'src/app/service/storage.service';
import { urlEndpoint } from 'src/app/utils/constant';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/emptycart.json',
  };
  UserCart: CartResp[] = [];
  StockReq: Stock[] = [];
  addresses: Address[]=[];
  address:number = 0;
  user: AppUser = {
    id: 0,
    username: '',
    password: '',
    role: '',
  };
  constructor(
    private homeService: HomeService,
    private storageService: StorageService,
    private cartService: CartService,
    private profileService:ProfileService
  ) {}
  ngOnInit(): void {

    this.user = this.storageService.getLoggedInUser();
    this.profileService
      .getUserAddress(this.storageService.getLoggedInUser().id)
      .subscribe({
        next: (resp: any) => {
          this.addresses = resp.data;
          console.log(this.addresses);
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

  getTotal():number{
    let Total:number = this.UserCart.reduce((sum, a) => sum+ (a.item.price*a.count), 0);
    return Total
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

  checkout(): void {
    let checkOutData: any = {
      userId: this.storageService.getLoggedInUser().id,
      addressId: this.address,
    };
    for (let item of this.UserCart) {
      let stock: Stock = {
        id: item.item.id!,
        stock: item.count,
      };
      this.StockReq.push(stock);
    }
    console.log(checkOutData);
    
    this.cartService.updateStock(this.StockReq).subscribe({
      next: () => (this.StockReq = []),
    });
    this.cartService.checkout(checkOutData).subscribe({
      next: (resp: any) => console.log(resp),
    });
  }
  getPhoto(id:number):String{
    return `${urlEndpoint.baseUrl}/download/${id}`
  }
  getCartCount():number{
    let count=this.UserCart.reduce((num,item)=>num+item.count,0);
    return count;
  }
}
