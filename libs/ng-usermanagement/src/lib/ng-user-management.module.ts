import { ModuleWithProviders, NgModule } from '@angular/core';
import { FirebaseNameOrConfigToken, FirebaseOptionsToken } from '@angular/fire';
import { INgUserManagementConfig, ngUserManagementConfigFactory, NgUserManagementConfigToken, UserProvidedConfigToken } from './interfaces/firebase-config.interface';
import { LoginProvidersModule } from './login/login-providers.module';
import { RegisterModule } from './register/register.module';
import { SpinnerModule } from './spinner/spinner.module';
import { LoginRegisterModule } from './templates/login-register.module';
@NgModule({
  declarations: [
  ],
  imports: [],
  exports: [
    LoginProvidersModule,
    RegisterModule,
    SpinnerModule,
    LoginRegisterModule,
  ],
  providers: []
})
export class NgUserManagementModule { 
  static forRoot(
    //configFactory: FirebaseAppConfig,
    config: INgUserManagementConfig = {},
    appNameFactory?: () => string
  ): ModuleWithProviders {
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
        ]
    };
  }
}