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
  formCategory!: string;
  formStatus: string = 'Add';
  categoryId!: string;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;
      console.log(this.categoryArray);
    });
  }

  onSubmit(formData: { reset: any; value: { category: string } }) {
    let categoryData: Category = {
      category: formData.value.category,
    };

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updataData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }
  }

  onEdit(category: string, id: string) {
    this.formCategory = category;
    this.categoryId = id;
    this.formStatus = 'Edit';
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
