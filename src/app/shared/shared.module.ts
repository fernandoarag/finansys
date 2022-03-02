import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [],
  exports: [
    // Shared Modules
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
