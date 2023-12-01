import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from 'src/app/model/address';
import { AppUser } from 'src/app/model/appUser';
import { ProfileService } from 'src/app/service/profile.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  addresses: Address[] = [];
  user: AppUser = {
    id: 0,
    username: '',
    password: '',
    role: '',
  };
  address: String = '';
  city: String = '';
  zipcode: number = 0;
  buttontxt: String = 'Add';
  editstate: number = 0;

  constructor(
    private storageService: StorageService,
    private profileService: ProfileService
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
  }

  add(addressForm: NgForm): void {
    if (this.editstate !== 0) {
      let addressBody: Address = {
        id:this.editstate,
        address: this.address,
        city: this.city,
        zipcode: this.zipcode,
        userId: this.storageService.getLoggedInUser().id,
      };
      this.profileService.updateAddress(addressBody).subscribe({
        next: (resp: any) => {
          this.address = resp.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => console.log('done'),
      });
      addressForm.reset()
      this.buttontxt = "Add"
    } else {
      let addressBody: Address = {
        address: this.address,
        city: this.city,
        zipcode: this.zipcode,
        userId: this.storageService.getLoggedInUser().id,
      };
      this.profileService.addAddress(addressBody).subscribe({
        next: (resp: any) => {
          this.addresses = resp.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => console.log('done'),
      });
      addressForm.reset()
    }
  }

  delete(id: number): void {
    this.profileService
      .deleteAddress(this.storageService.getLoggedInUser().id, id)
      .subscribe({
        next: (resp: any) => {
          this.addresses = resp.data;
        },
      });
  }

  edit(id: number): void {
    this.editstate = id;
    this.buttontxt = 'Edit';
    let address: Address = this.addresses.find((add) => add.id === id)!;
    this.address = address.address;
    this.city = address.city;
    this.zipcode = address.zipcode;
  }
}
