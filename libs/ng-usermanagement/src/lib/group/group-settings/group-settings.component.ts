import { Component, Inject, Input } from '@angular/core';
import { NgSnackBarToken, SnackBarInterface } from '../../interfaces/snackbar-config.interface';
import { Group } from '../../models/group.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'ng-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})

export class GroupSettingsComponent {
  
  /**
   * Add extra group data on updating the user settings
   */
  @Input() extraGroupData: Object;

  /**
   * The current group
   */
  @Input() currentGroup: Group;

  loading: boolean = false;

  constructor(private groupService: GroupService, 
    @Inject(NgSnackBarToken) public snackBar: SnackBarInterface) {
  }
  
  /**
   * Update the current group data
   * @param groupData 
   */
  public updateGroupData(groupData: Object): Promise<void> {
    this.loading = true;
    groupData = { ...groupData, ...this.extraGroupData }
    return this.groupService.updateGroupData(this.currentGroup.groupId, groupData)
    .then(() => {
      this.loading = false;
      this.snackBar.open('update succesful', '', { duration: 2000 })
    })
    .catch((err) => this.errorHandler(err.message));
  }

  /**
   * Delete the current group
   */
  public deleteGroup(): Promise<void> {
    this.loading = true;
    return this.groupService.deleteGroup(this.currentGroup.groupId)
    .then(() => {
      this.loading = false;
      this.snackBar.open('delete succesful', '', { duration: 2000 })
    })
    .catch((err) => this.errorHandler(err.message));
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
