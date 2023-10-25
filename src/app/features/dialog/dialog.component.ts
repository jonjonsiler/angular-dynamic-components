import { 
  Component,
  Type,
  ViewChild,
  OnDestroy,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';
import { DialogRef } from './dialog-ref';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit, OnDestroy {

  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;

  private readonly _onClose = new Subject<any>();
  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose = this._onClose.asObservable();

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private dialogRef: DialogRef = inject(DialogRef);

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  handleClose(): void {
    this.dialogRef.close();
  }

  loadChildComponent(componentType: Type<any>) {
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentType);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next();
  }
}
