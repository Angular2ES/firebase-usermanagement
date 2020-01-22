import { of } from 'rxjs';
import { AdminAuthGuardService } from './admin-auth-guard.service';


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


fdescribe('adminGuardService', () => {

  let testService: AdminAuthGuardService;

  beforeEach(() => {
    testService = new AdminAuthGuardService(new MockEmptyAngularFireAuth() as any, new MockSnackBar() as any);
  })
  
  it('should have been called', () => {
    spyOn(AdminAuthGuardService.prototype, 'canActivate')
    testService.canActivate(null, null);
    expect(testService.canActivate).toHaveBeenCalled();
  });

  it('should return false', () => {
    // Subscribe to the observable
    testService.canActivate(null,null).subscribe( result => {
      expect(result).toEqual(false)
    })
  })

  it('should return true', (done) => {
    testService = new AdminAuthGuardService(new MockAngularFireAuth() as any, new MockSnackBar() as any);

    // Subscribe to the observable and wait for the promise to resolve
    testService.canActivate(null,null).subscribe(result => {
      expect(result).toEqual(true)
      done()
    })
  })
});
