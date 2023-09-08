import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { TaskDetailsComponent } from './task-details/task-details.component';

@NgModule({
  declarations: [
    LoaderComponent,
    AddTaskComponent,
    HeaderComponent,
    TaskDetailsComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [LoaderComponent, HeaderComponent],
})
export class ComponentsModule {}
