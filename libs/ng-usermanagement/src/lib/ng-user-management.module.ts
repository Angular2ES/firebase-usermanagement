import { ModuleWithProviders, NgModule } from '@angular/core';
import { FirebaseNameOrConfigToken, FirebaseOptionsToken } from '@angular/fire';
import { ngUserManagementConfig, ngUserManagementConfigFactory, NgUserManagementConfigToken, UserProvidedConfigToken } from './interfaces/firebase-config.interface';
import { LoginProvidersModule } from './login/login-providers.module';
import { RegisterModule } from './register/register.module';

import { SpinnerModule } from './spinner/spinner.module';
import { AdminSettingsModule } from './settings/admin/admin.settings.module';
import { UserSettingsModule } from './settings/user/user.settings.module';
import { UserAdminSettingsModule } from './settings/user.admin.settings.module';
import { GroupModule } from './group/group.Module';


import { AdminAuthGuardService } from './guards/admin-auth-guard.service';
import { AdminPopupModule } from './settings/admin/admin-popup/admin-popup.module';
import { AdminPopupService } from './settings/admin/admin-popup/admin-popup.service';
import { UserAuthGuardService } from './guards/user-auth-guard.service';


@NgModule({
  declarations: [
  ],
  imports: [AdminPopupModule],
  exports: [
    LoginProvidersModule,
    RegisterModule,
    SpinnerModule,
    AdminSettingsModule,
    UserSettingsModule,
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
          }
        ]
    };
  }
}