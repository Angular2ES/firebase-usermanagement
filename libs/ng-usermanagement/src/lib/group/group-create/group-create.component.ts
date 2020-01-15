import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ng-create-group',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})

export class GroupCreateComponent {

  @Input() extraGroupData: Object;
  @Input() redirectOnSucces: string;

  public curUser: Observable<any>;
  public loading: boolean = false;

  private curUserId: string;

  constructor(private groupService: GroupService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {
      this.curUser = this.userService.currentUser.pipe(
        map(user => user ? this.curUserId = user.uid : null)
        
      )
  }

  async createGroup(groupName: string, extraGroupData: any): Promise<void>{
    try {
      this.loading = true;
      await this.groupService.createGroup(this.curUserId, groupName, extraGroupData);
      this.snackBar.open('group succesfully created', '', { duration: 2000 });
      this.loading = false;
      if (this.redirectOnSucces != null) this.router.navigate([this.redirectOnSucces])
    } catch(err) {
      this.errorHandler(err.message);
    }
  }

  private errorHandler(errorMessage: string){
    this.loading = false;
    this.snackBar.open(errorMessage, '', { duration: 2000 });
  }
}
