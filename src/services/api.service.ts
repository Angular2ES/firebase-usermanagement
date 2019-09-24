import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  createGroup(uid: string, groupId: string, groupName: string): Promise<any> {
    const body = { uid: uid, groupName: groupName, groupId: groupId};
    return this.http.post('/firebaseApi/createGroup', body).toPromise();
  }

  addUserToGroup(uid: string, groupId: string): Promise<any> {
    const body = { uid: uid, groupId: groupId};
    return this.http.post('/firebaseApi/addUserToGroup', body).toPromise();
  }
}
