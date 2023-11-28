import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  loadData() {
    return this.afs
  }

  loadOneData(id: any) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  saveData(postData: any) {
  }

  updateData(id: any, postData: any) {
  }

  deleteImage(postImgPath: any, id: any) {
  }

  deleteData(id:any){
  }
}
