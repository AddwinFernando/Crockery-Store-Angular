import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Item } from 'src/app/model/item';
import { AdminCategoryService } from 'src/app/service/admin/admin-category.service';
import { AdminHomeService } from 'src/app/service/admin/adminHome.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  error: String = '';
  buttontxt: String = 'Add';
  title: String = '';
  description: String = '';
  category: number = 1;
  price: number = 0;
  categories: Category[] = [];
  param: number | null = null;
  constructor(
    private adminCategoryService: AdminCategoryService,
    private adminHomeService: AdminHomeService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.adminCategoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
    });
    this.route.queryParams.subscribe((params) => {
      this.param = params['id'];
      if (this.param) {
        this.adminHomeService.getProduct(this.param).subscribe({
          next: (response: any) => {
            this.title = response.data.items[0].title;
            this.price = response.data.items[0].price;
            this.description = response.data.items[0].description;
            this.category = response.data.items[0].category;
            this.buttontxt = 'Edit';
          },
          error: (err) => {
            let message: string = err?.error?.error?.message;
            this.error = message.includes(',')
              ? message.split(',')[0]
              : message;
          },
        });
      }
    });
  }

  add(addForm: NgForm): void {
    if (this.param) {
      let item: Item = {
        id: this.param,
        title: this.title,
        description: this.description,
        category: this.category,
        price: this.price,
      };
      this.adminHomeService.updateProduct(item).subscribe({
        error: (err) => {
          console.log(err);
          let message: String = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete: () => console.log('There are no more action happen.'),
      });
      addForm.reset();
    } else {
      let item: Item = {
        id: null,
        title: this.title,
        description: this.description,
        category: this.category,
        price: this.price,
      };
      this.adminHomeService.addProduct(item).subscribe({
        error: (err) => {
          console.log(err);
          let message: String = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete: () => console.log('There are no more action happen.'),
      });
      addForm.reset();
    }
  }
}
