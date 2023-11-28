import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: any, password: any) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
      })
      .catch((e) => {
        this.toastr.warning(
          'Password is invalid or the user does not have a password'
        );
      });
  }


  logOut() {
    this.afAuth.signOut().then(() => {
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
