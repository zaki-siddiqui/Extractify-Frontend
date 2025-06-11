// File: Extractify.Frontend/Extractify.Frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDataComponent } from './components/task-data/task-data.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/:id/data', component: TaskDataComponent },
  { path: 'create-task', component: TaskFormComponent }
];