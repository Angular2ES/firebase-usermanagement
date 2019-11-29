import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(
    private http: HttpClient
    )
  {}

  /**
   * Login as an other user
   * @param uid 
   */
  async impersonateUser(uid: string): Promise<any> {
    const body = { uid: uid }
    return this.http.post('/firebaseApi/createUserToken', body, {responseType: 'text'}).toPromise()
      .then((res) => {
        firebase.auth().signInWithCustomToken(res)
          .then((userCredentials) => console.log(userCredentials))
          .catch((e) => console.log(e));
      })
      .catch(e => console.log(e))

  }
}