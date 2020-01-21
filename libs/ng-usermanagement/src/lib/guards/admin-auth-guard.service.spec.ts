import { TestBed } from '@angular/core/testing';

import { AdminAuthGuardService } from './admin-auth-guard.service';
import { of, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
var sinon = require('sinon')

class MockEmptyAngularFireAuth {
  user = of(null);
}

class MockAngularFireAuth {
  user = of(new FakeFirebaseUser(true));
}

class FakeFirebaseUser {
  constructor(private isAdmin: boolean) {}

  getIdTokenResult() {
    return Promise.resolve({
      claims: {
        admin: this.isAdmin
      }
    })
  }
}

class MockSnackBar {
  open() {}
}


describe('adminGuardService', () => {

  let testService: AdminAuthGuardService;
  let spy: any;

  beforeEach(() => {
    
    // spyService = jasmine.createSpyObj('afAuth', ['user'])
    const fakeService = sinon.fake.returns(new MockEmptyAngularFireAuth());
    const fakeSnackbar = sinon.fake.returns(new MockSnackBar());
    testService = new AdminAuthGuardService(fakeService(), fakeSnackbar());
  })
  
  it('should have been called', () => {
    spy = spyOn(AdminAuthGuardService.prototype, 'canActivate')
    testService.canActivate(null, null);
    expect(testService.canActivate).toHaveBeenCalled();
  });

  it('should return false', () => {
    testService.canActivate(null,null).subscribe( result => {
      expect(result).toEqual(false)
    })
  })

  it('should return true', () => {
    const fakeService = sinon.fake.returns(new MockAngularFireAuth());
    const fakeSnackbar = sinon.fake.returns(new MockSnackBar());
    testService = new AdminAuthGuardService(fakeService(), fakeSnackbar());

    testService.canActivate(null,null).subscribe( result => {
      expect(result).toEqual(true)
    })
  })
});
