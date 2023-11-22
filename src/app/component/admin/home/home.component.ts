import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { AdminHomeService } from 'src/app/service/admin/adminHome.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent implements OnInit {
  error: string = '';
  items: Item[] = [];
  constructor(
    private adminHomeService: AdminHomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminHomeService.getProducts().subscribe({
      next: (response: any) => {
        this.items = response.data.items;
      },
    });
  }

  del(id: number | null): void {
    this.adminHomeService.deletePoduct(id).subscribe({
      next: (response: any) => {
        this.items = response.data.items;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  edit(id: number | null) {
    this.router.navigate(['/admin-add'], { queryParams: { id: id } });
  }
}
