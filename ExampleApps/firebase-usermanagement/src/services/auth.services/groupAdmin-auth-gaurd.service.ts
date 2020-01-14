import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, switchMap} from 'rxjs/operators';
import { GroupService } from '../group.service';
import { Group } from '../../models/group.model';
import { UserService } from '../user.service';

@Injectable()
export class GroupAdminAuthGuardService implements CanActivate {
  state: RouterState;
  snapshot: RouterStateSnapshot;

  constructor(private groupService: GroupService, 
    private userService: UserService,
    private router: Router) {
    this.state = router.routerState;
    this.snapshot = this.state.snapshot;      
  }

  // TODO give feedback to the user
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // TODO who has permission to edit the settings of the group
    return this.groupService.getGroup(route.params['id']).pipe(
      switchMap((group: Group) => this.IsCurUserAdmin(group.users['admins'])),
    )
  }

  private IsCurUserAdmin(permissions: string[]): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(
      map(user => permissions.includes(user.uid))
    )
  }
}