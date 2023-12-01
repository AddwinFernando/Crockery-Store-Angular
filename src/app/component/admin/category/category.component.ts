import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { AdminCategoryService } from 'src/app/service/admin/admin-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private adminCategoryService: AdminCategoryService) {}
  categories: Category[] = [];
  category: String = '';
  buttontxt: String = 'Add';
  titletxt:String = 'Add-Category'
  error: String = '';
  editState: number = 0;
  ngOnInit(): void {
    this.adminCategoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
    });
  }

  add(): void {
    if (this.editState === 0) {
      let categoryReq: Category = {
        title: this.category,
      };
      this.adminCategoryService.addCategory(categoryReq).subscribe({
        next: (response: any) => {
          this.categories = response.data;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
      this.category = '';
    } else {
      let categoryReq: Category = {
        id: this.editState,
        title: this.category,
      };
      this.adminCategoryService.updateCategory(categoryReq).subscribe({
        next: (response: any) => {
          this.categories = response.data;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
      this.buttontxt = 'Add';
      this.titletxt = 'Add-Category'
      this.category = '';
    }
  }

  delete(id: number): void {
    this.adminCategoryService.deleteCategory(id).subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  edit(id: number) {
    this.category = this.categories.find((cat) => cat.id === id)?.title!;
    this.buttontxt = 'Edit';
    this.titletxt = 'Edit-Category'
    this.editState = id;
  }
}
