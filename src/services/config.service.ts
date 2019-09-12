import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class ConfigService {
  configUrl = '/firebaseApi/createUser';

  constructor(private http: HttpClient) {

  }
  getConfig(uid: string): Promise<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // };
    const body = { uid: uid };
    return this.http.post(this.configUrl, body).toPromise();
  }

  createGroup(uid: string, groupId: string, groupName: string): Promise<any> {
    const body = { uid: uid, groupName: groupName, groupId: groupId};
    return this.http.post('/firebaseApi/createGroup', body).toPromise();
  }
}
