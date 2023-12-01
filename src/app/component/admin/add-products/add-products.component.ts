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
  stock: number = 0;
  photo: String = '';
  file = '';
  param: number | null = null;
  constructor(
    private adminCategoryService: AdminCategoryService,
    private adminHomeService: AdminHomeService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.param = params['id'];
      if (this.param) {
        this.adminHomeService.getProduct(this.param).subscribe({
          next: (response: any) => {
            console.log(response);
            this.title = response.data.items[0].title;
            this.price = response.data.items[0].price;
            this.description = response.data.items[0].description;
            this.category = response.data.items[0].category;
            this.stock = response.data.items[0].stock;
            this.photo = response.data.items[0].photo;
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
    this.adminCategoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
        console.log(this.param);
        
      },
    });
  }

  add(addForm: NgForm): void {
    if (this.param) {
      console.log('edit');
      let formData: Item = {
        id: this.param,
        title: this.title,
        description: this.description,
        category: this.category,
        stock: this.stock,
        price: this.price,
        photo: this.photo,
      };

      this.adminHomeService.updateProduct(formData).subscribe({
        error: (err) => {
          console.log(err);
          let message: String = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete: () =>
          console.log('There are no more action happen.', this.param),
      });
      addForm.reset();
    } else {
      let formData = new FormData();

      formData.append('photo', this.file);
      formData.append('title', this.title.toString());
      formData.append('description', this.description.toString());
      formData.append('category', this.category.toString());
      formData.append('stock', this.stock.toString());
      formData.append('price', this.price.toString());

      this.adminHomeService.addProduct(formData).subscribe({
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
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];

      // console.log('Selected file',this.file);
    }
  }
}
