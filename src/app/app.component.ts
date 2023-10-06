import { Component } from '@angular/core';
import { DialogService } from './features/dialog/dialog.service';
import { ExampleComponent } from './features/example/example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: DialogService) {
    const ref = this.dialog.open(ExampleComponent, { data: { message: 'I am a dynamic component inside of a dialog!' } });

    ref.afterClosed.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
}
