import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { ICategory } from '../../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss'
})
export class CategoryMenuComponent implements OnInit  {

  private categoryService = inject(CategoryService);
  categories: ICategory[] = [];

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categoryService.getAll()
       .subscribe( data => {
        this.categories = data;
      })
  }

}
