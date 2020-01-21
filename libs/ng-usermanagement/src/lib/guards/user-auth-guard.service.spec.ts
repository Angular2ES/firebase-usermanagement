import { TestBed } from '@angular/core/testing';

import { UserAuthGuardService } from './user-auth-guard.service';
import { of, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
var sinon = require('sinon')

class MockUserService {
  user$ = of({})
}

class MockEmptyUserService {
  user$ = of(null)
}


class MockSnackBar {
  open() {}
}


describe('UserGuardService', () => {

  let testService: UserAuthGuardService;
  let spy: any;

  beforeEach(() => {
    
    // spyService = jasmine.createSpyObj('afAuth', ['user'])
    const fakeService = sinon.fake.returns(new MockUserService());
    const fakeSnackbar = sinon.fake.returns(new MockSnackBar());
    testService = new UserAuthGuardService(fakeService(), fakeSnackbar());
  })
  
  it('should have been called', () => {
    spy = spyOn(UserAuthGuardService.prototype, 'canActivate')
    testService.canActivate(null, null);
    expect(testService.canActivate).toHaveBeenCalled();
  });

  it('should return true', () => {
    testService.canActivate(null,null).subscribe( result => {
      expect(result).toEqual(true)
    })
  })

  it('should return false', () => {
    const fakeService = sinon.fake.returns(new MockEmptyUserService());
    const fakeSnackbar = sinon.fake.returns(new MockSnackBar());
    testService = new UserAuthGuardService(fakeService(), fakeSnackbar());

    testService.canActivate(null,null).subscribe( result => {
      expect(result).toEqual(false)
    })
  })

});
