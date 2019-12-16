import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../models/group.model';
import { GroupService } from '../../services/group.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { firestore } from 'firebase';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})

export class GroupSettingsComponent {

  currentGroup$: Observable<Group>;
  private curGroupForm: FormGroup;

  curUserForm: FormGroup;
  userList$: Observable<string[]>;

  constructor(private groupService: GroupService, 
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder) {
    }
}
