import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DialogComponent,
    InsertionDirective
  ],
})
export class DialogModule {}
