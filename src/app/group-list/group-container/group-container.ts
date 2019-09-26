import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from 'src/services/validation.service';

interface groupForm {
  groupId: string;
  groupName: string;
}

@Component({
  selector: 'group-container',
  template: `{{groupid}}`
})
export class GroupContainer implements OnInit{
  @Input('init') groupid: string;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.groupid);
  }
}