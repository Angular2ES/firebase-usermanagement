import { ModuleWithProviders, NgModule, TypeDecorator } from '@angular/core';
import { FirebaseNameOrConfigToken, FirebaseOptionsToken } from '@angular/fire';
import { INgUserManagementConfig, ngUserManagementConfigFactory, NgUserManagementConfigToken, UserProvidedConfigToken } from './interfaces/firebase-config.interface';
import { IInputValidation, InputValidationToken, UserProvidedValidationToken, ngInputValidationFactory} from './interfaces/input-validation.interface'
import { LoginEmailPasswordModule } from './login-providers/login-email-password/login-email-password.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    LoginEmailPasswordModule,
    RegisterModule,
  ],
  providers: []
})
export class NgUserManagementModule { 
  static forRoot(
    //configFactory: FirebaseAppConfig,
    config: INgUserManagementConfig = {},
    inputValidationConfig?: IInputValidation,
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
          {provide: UserProvidedValidationToken, useValue: inputValidationConfig},
          {
            provide: InputValidationToken,
            useFactory: ngInputValidationFactory,
            deps: [UserProvidedValidationToken]
          }

        ]
    };
  }
}