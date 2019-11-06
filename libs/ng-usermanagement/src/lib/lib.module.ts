import { ModuleWithProviders, NgModule } from '@angular/core';
import { FirebaseNameOrConfigToken, FirebaseOptionsToken } from '@angular/fire';
import { INgUserManagementConfig, ngUserManagementConfigFactory, NgUserManagementConfigToken, UserProvidedConfigToken } from './interfaces/firebase-config.interface';
import { LoginEmailPasswordModule } from './login-email-password/login-email-password.module';
import { RegisterModule } from './register/register.module';
import { SpinnerModule } from './spinner/spinner.module';
@NgModule({
  declarations: [],
  imports: [],
  exports: [
    LoginEmailPasswordModule,
    RegisterModule,
    SpinnerModule,
  ],
  providers: []
})
export class LibModule { 
  static forRoot(
    //configFactory: FirebaseAppConfig,
    config: INgUserManagementConfig = {},
    appNameFactory?: () => string
  ): ModuleWithProviders {
    return {
      ngModule: LibModule,
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
        ]
    };
  }
}