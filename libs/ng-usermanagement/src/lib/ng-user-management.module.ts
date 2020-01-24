import { ModuleWithProviders, NgModule, Injector } from '@angular/core';
import { FirebaseNameOrConfigToken, FirebaseOptionsToken } from '@angular/fire';
import { ngUserManagementConfig, ngUserManagementConfigFactory, NgUserManagementConfigToken, UserProvidedConfigToken } from './interfaces/firebase-config.interface';
import { LoginProvidersModule } from './login/login-providers.module';
import { RegisterModule } from './register/register.module';

import { SpinnerModule } from './spinner/spinner.module';
import { UserAdminSettingsModule } from './settings/user.admin.settings.module';
import { GroupModule } from './group/group.Module';

import { AdminAuthGuardService } from './guards/admin-auth-guard.service';
import { AdminPopupModule } from './settings/admin/admin-popup/admin-popup.module';
import { AdminPopupService } from './settings/admin/admin-popup/admin-popup.service';
import { UserAuthGuardService } from './guards/user-auth-guard.service';
import { UserProvidedSnackBarToken, ngSnackBarFactory, SnackBarInterface, NgSnackBarToken } from './interfaces/snackbar-config.interface';


@NgModule({
  declarations: [
  ],
  imports: [AdminPopupModule],
  exports: [
    LoginProvidersModule,
    RegisterModule,
    SpinnerModule,
    UserAdminSettingsModule,
    AdminPopupModule,
    GroupModule,
  ],
  providers: [
    AdminAuthGuardService,
    UserAuthGuardService,
    AdminPopupService
  ]
})
export class NgUserManagementModule { 
  static forRoot(
    //configFactory: FirebaseAppConfig,
    config: ngUserManagementConfig = {},
    snackBar?: SnackBarInterface,
    appNameFactory?: () => string
  ): ModuleWithProviders<any> {
    return {
      ngModule: NgUserManagementModule,
      providers:
        [
          {
            provide: FirebaseOptionsToken,
            useValue: config.firebaseConfig
          },
          {
            provide: FirebaseNameOrConfigToken,
            useFactory: appNameFactory
          },
          {provide: UserProvidedConfigToken, useValue: config},
          {
            provide: NgUserManagementConfigToken,
            useFactory: ngUserManagementConfigFactory,
            deps: [UserProvidedConfigToken]
          },
          {provide: UserProvidedSnackBarToken, useValue: snackBar},
          {
            provide: NgSnackBarToken,
            useFactory: ngSnackBarFactory,
            deps: [UserProvidedSnackBarToken, Injector]
          }
       ]
    };
  }
}