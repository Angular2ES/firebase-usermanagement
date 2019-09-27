import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'group-list-container',
  templateUrl: './group-list-container.component.html'
})
export class GroupListContainerComponent{
  @Input('group') group: FormGroup;
  
  constructor(private router: Router){
    this.group = new FormBuilder().group({});
  }
  
  groupSettings(groupId: string){
    this.router.navigate(['groupSettings', groupId])
  }
}