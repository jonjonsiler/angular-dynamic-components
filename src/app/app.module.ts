import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DialogModule } from './features/dialog/dialog.module';
import { ExampleComponent } from './features/example/example.component';

@NgModule({
  declarations: [AppComponent, ExampleComponent],
  imports: [BrowserModule, DialogModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
