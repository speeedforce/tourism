import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContentComponent } from './header-content/header-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderContentComponent],
  exports: [HeaderContentComponent]
})
export class SharedModule { }
