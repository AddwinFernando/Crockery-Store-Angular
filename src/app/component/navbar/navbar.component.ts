import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAdmin:Boolean = false;
  constructor( private authService: AuthService,private storageService: StorageService){}
  count:number=0;
  ngOnInit(): void {
    this.count = this.storageService.getCartCount();
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
  logout(): void {
    this.authService.logout();
  }
  getCartCount():number{
    return this.storageService.getCartCount()
  }
}
