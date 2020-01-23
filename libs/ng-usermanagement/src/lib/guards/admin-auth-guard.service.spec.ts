import { of, Subject } from 'rxjs';
import { AdminAuthGuardService } from './admin-auth-guard.service';

class MockAngularFireAuth {
  user = new Subject()

  addNewAdminUser() {
    this.user.next(new MockFirebaseUser(true));
  }

  addNewNormalUser() {
    this.user.next(new MockFirebaseUser(false));
  }

  addRejectTokenResultUser() {
    this.user.next(new MockFirebaseUserRejectTokenResult());
  }

  addNullUser() {
    this.user.next(null);
  }
}

class MockFirebaseUser {
  constructor(private isAdmin: boolean) {}

  getIdTokenResult() {
    return Promise.resolve({
      claims: {
        admin: this.isAdmin
      }
    })
  }
}

class MockFirebaseUserRejectTokenResult {
  constructor() {}

  getIdTokenResult() {
    return Promise.reject()
  }
}

class MockSnackBar {
  open() {}
}


describe('adminGuardService', () => {

  let angularFireAuth: MockAngularFireAuth;

  beforeEach(() => {
    angularFireAuth = new MockAngularFireAuth();
  })

  it('should have been called', () => {
    let testService = new AdminAuthGuardService(angularFireAuth as any, new MockSnackBar() as any);
    spyOn(AdminAuthGuardService.prototype, 'canActivate')
    testService.canActivate(null, null);
    expect(testService.canActivate).toHaveBeenCalled();
  });

  it('should return false', (done) => {
    let testService = new AdminAuthGuardService(angularFireAuth as any, new MockSnackBar() as any);
    // Subscribe to the observable
    testService.canActivate(null,null).subscribe( result => {
      expect(result).toEqual(false);
      done();
    })

    // add a new user with a value of Null
    angularFireAuth.addNullUser();
  })

  it('should return true', (done) => {
    let testService = new AdminAuthGuardService(angularFireAuth as any, new MockSnackBar() as any);

    // Subscribe to the observable and wait for the promise to resolve
    testService.canActivate(null,null).subscribe(result => {
      expect(result).toEqual(true)
      done()
    })
    
    // add a new admin user
    angularFireAuth.addNewAdminUser();
  })

  it('should return true if the user is updated before the stream ends', (done) => {
    let testService = new AdminAuthGuardService(angularFireAuth as any, new MockSnackBar() as any);

    // Subscribe to the observable and wait for the promise to resolve
    testService.canActivate(null,null).subscribe(result => {
      expect(result).toEqual(true)
      done();
    })
    
    // send a user and immediately send an admin user
    angularFireAuth.addNewNormalUser();
    angularFireAuth.addNewAdminUser();
  })

  it('should return false when the token is rejected', (done) => {
    let testService = new AdminAuthGuardService(angularFireAuth as any, new MockSnackBar() as any);

    // Subscribe to the observable and wait for the promise to resolve
    testService.canActivate(null,null).subscribe(result => {
      expect(result).toEqual(false)
      done();
    })
    
    // send a user and immediately send an admin user
    angularFireAuth.addRejectTokenResultUser();
  })
});
