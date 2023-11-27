import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {}

  onSubmit(formData: { value: { category: string } }) {
    let categoryData = {
      category: formData.value.category,
      status: 'active',
    };

    let subCategoryData = {
      subCategory: 'subCategory1',
    };

    this.afs
      .collection('categories')
      .add(categoryData)
      .then((docRef) => {
        console.log(docRef);

        this.afs
          .collection('categories')
          .doc(docRef.id)
          .collection('subcategories')
          .add(subCategoryData)
          .then((docRef1) => {
            console.log(docRef1);

            this.afs
              .collection('categories')
              .doc(docRef.id)
              .collection('subcategories')
              .doc(docRef1.id)
              .collection('subsubcategories')
              .add(subCategoryData)
              .then((docRef2) => {
                console.log('Second Level Subcategory Saved Successfully');
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
