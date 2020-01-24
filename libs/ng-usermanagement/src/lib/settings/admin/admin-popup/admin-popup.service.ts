
import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core'
import { AdminPopupComponent } from './admin-popup.component'

@Injectable()
export class AdminPopupService {
  /**
   * A reference to the admin popup component
   */
  dialogComponentRef: ComponentRef<AdminPopupComponent>

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * open the admin popup
   */
  private appendDialogComponentToBody(){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AdminPopupComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
  
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  
    this.dialogComponentRef = componentRef;
  }

  /**
   * close the admin popup
   */
  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  /**
   * open the admin popup
   */
  public open() {
    this.appendDialogComponentToBody();
  }

  /**
   * close the admin popup
   */
  public close() {
    this.removeDialogComponentFromBody();
  }
}