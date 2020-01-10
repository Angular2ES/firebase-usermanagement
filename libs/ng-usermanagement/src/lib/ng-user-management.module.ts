import { ModuleWithProviders, NgModule } from '@angular/core';
import { FirebaseNameOrConfigToken, FirebaseOptionsToken } from '@angular/fire';
import { ngUserManagementConfig, ngUserManagementConfigFactory, NgUserManagementConfigToken, UserProvidedConfigToken } from './interfaces/firebase-config.interface';
import { LoginProvidersModule } from './login/login-providers.module';
import { RegisterModule } from './register/register.module';
import { UserAdminSettingsModule } from './settings/user.admin.settings.module';
import { SpinnerModule } from './spinner/spinner.module';


@NgModule({
  declarations: [
  ],
  imports: [],
  exports: [
    LoginProvidersModule,
    RegisterModule,
    SpinnerModule,
    UserAdminSettingsModule,
  ],
  providers: []
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