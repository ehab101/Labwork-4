import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

   login() {
    this.storage.set(TOKEN_KEY, 'Bearer 1234567');
    this.authenticationState.next(true);
  }

   logout() {
     this.storage.remove(TOKEN_KEY);
     this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
