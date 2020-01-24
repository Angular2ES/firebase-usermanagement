import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NgSnackBarToken, SnackBarInterface } from '../../interfaces/snackbar-config.interface';
import { UserModel } from '../../models/user.model';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ng-create-group',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})

export class GroupCreateComponent {

  /**
   * Add extra group data in the database on creating the group
   */
  @Input() extraGroupData: Object;

  /**
   * Redirect the user on succesfully creating a group
   */
  @Input() redirectOnSucces: string;

  /**
   * The current user
   */
  public curUser: Observable<UserModel>;
  public loading: boolean = false;

  /**
   * The current user Id
   */
  private curUserId: string;

  constructor(private groupService: GroupService,
    private userService: UserService,
    @Inject(NgSnackBarToken) public snackBar: SnackBarInterface,
    private router: Router) {
      this.curUser = this.userService.user$.pipe(
        map(user => user as UserModel),
        tap(user => user ? this.curUserId = user.uid : null)
      )
  }

  /**
   * Creating a group with an group name and 
   * @param groupName 
   * @param extraGroupData 
   */
  async createGroup(groupName: string): Promise<void>{
    try {
      this.loading = true;
      await this.groupService.createGroup(this.curUserId, groupName, this.extraGroupData);
      this.snackBar.open('group succesfully created', '', { duration: 2000 });
      this.loading = false;
      if (this.redirectOnSucces != null) this.router.navigate([this.redirectOnSucces])
    } catch(err) {
      this.errorHandler(err.message);
    }
  }

  /**
   * remove the loading and show a snackbar of the error
   * @param errorMessage - An error message
   */
  private errorHandler(errorMessage: string){
    this.loading = false;
    this.snackBar.open(errorMessage, '', { duration: 2000 });
  }
}
