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

  uploadImage(selectedImage: any, postData: any, formStatus: any, id: any) {
    const filePath = `postIMG/${Date.now()}`;

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Post image uploaded successfully.');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;

          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  loadData() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadOneData(id: any) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Post Data Insert Successfully ..!');
        this.router.navigate(['/posts']);
      });
  }

  updateData(id: any, postData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Post Data Update Successfully ..!');
        this.router.navigate(['/posts']);
      });
  }

  deleteImage(postImgPath: any, id: any) {
    this.storage.storage.refFromURL(postImgPath).delete().then(()=>{
      this.deleteData(id);
    })
  }

  deleteData(id:any){
    this.afs.doc(`posts/${id}`).delete().then(()=>{
      this.toastr.warning('Delete Successfully ..!');
    })
  }
}
