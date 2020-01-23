import { of } from 'rxjs';
import { UserAuthGuardService } from './user-auth-guard.service';

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

  beforeEach(() => {
    testService = new UserAuthGuardService(new MockUserService() as any, new MockSnackBar() as any);
  })
  
  it('should have been called', () => {
    spyOn(UserAuthGuardService.prototype, 'canActivate')
    testService.canActivate(null, null);
    expect(testService.canActivate).toHaveBeenCalled();
  });

  it('should return true', () => {
    testService.canActivate(null,null).subscribe( result => {
      expect(result).toEqual(true)
    })
  })

  it('should return false', () => {
    testService = new UserAuthGuardService(new MockEmptyUserService() as any, new MockSnackBar() as any);

    testService.canActivate(null,null).subscribe( result => {
      expect(result).toEqual(false)
    })
  })

});
