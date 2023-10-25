import { 
  Injectable,
  ApplicationRef,
  Injector,
  Type,
  ComponentRef,
  inject,
  createComponent,
  EmbeddedViewRef 
} from '@angular/core';
import { DialogModule } from './dialog.module';
import { DialogComponent } from './dialog.component';
import { DialogInjector } from './dialog-injector';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';

@Injectable({
  providedIn: DialogModule
})
export class DialogService {

  private dialogComponentRef: ComponentRef<DialogComponent>;
  private appRef: ApplicationRef = inject(ApplicationRef);
  private injector: Injector = inject(Injector);

  public open(
    componentType: Type<any>, 
    config: DialogConfig
  ) {
    const dialogRef = this.appendDialogComponentToBody(config);
    this.dialogComponentRef.instance.childComponentType = componentType;
    return dialogRef;
  }

  private appendDialogComponentToBody(config: DialogConfig) {
    const map = new WeakMap();
    const dialogRef = new DialogRef();
    const environmentInjector = this.appRef.injector;
    map.set(DialogConfig, config);
    map.set(DialogRef, dialogRef);
    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });
    // This will effectively create the component and attach it to the view
    this.dialogComponentRef = createComponent(DialogComponent, { 
      environmentInjector, 
      elementInjector: new DialogInjector(this.injector, map) 
    });
    this.appRef.attachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
    });
    document.body.appendChild((this.dialogComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]) as HTMLElement;
    return dialogRef;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
