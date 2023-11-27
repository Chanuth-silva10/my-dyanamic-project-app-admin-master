import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
 
  categoryArray!: Array<any>;

  constructor( private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categoryArray = val;
      console.log(this.categoryArray);
    });
  }

  onSubmit(formData: { value: { category: string } }) {

    let categoryData: Category = {
      category: formData.value.category
    };   
    
    this.categoryService.saveData(categoryData);

  }
}
