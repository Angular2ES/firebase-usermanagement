import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { auth } from 'firebase';
import { AuthenticationService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private snackBar: MatSnackBar
    )
  {}

  /**
   * Login as an other user
   * @param uid 
   */
  async impersonateUser(uid: string, adminUid: string): Promise<auth.UserCredential | void> {
    try {
      const adminToken = await this.http.post('/firebaseApi/createUserToken', { uid: adminUid }, { responseType: 'text' }).toPromise()
      const userToken = await this.http.post('/firebaseApi/createUserToken', { uid: uid }, { responseType: 'text' }).toPromise()
      return this.authService.loginWithCustomToken(userToken, adminToken)
    } catch(err) {
      this.errorHandler(err)
    }
  }
  
  private errorHandler(error: any): void {
    this.snackBar.open(error.message, '', { duration: 2000 });
  }
}