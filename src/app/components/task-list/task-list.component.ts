import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { ScrapingTask } from '../../models/scraping-task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <table mat-table [dataSource]="tasks" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let task">{{ task.scrapingTaskId }}</td>
      </ng-container>
      <ng-container matColumnDef="url">
        <th mat-header-cell *matHeaderCellDef>URL</th>
        <td mat-cell *matCellDef="let task">{{ task.url }}</td>
      </ng-container>
      <ng-container matColumnDef="selector">
        <th mat-header-cell *matHeaderCellDef>Selector</th>
        <td mat-cell *matCellDef="let task">{{ task.selector }}</td>
      </ng-container>
      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let task">{{ task.status }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let task">
          <button mat-button (click)="executeTask(task.scrapingTaskId)">Execute</button>
          <button mat-button (click)="viewData(task.scrapingTaskId)">View Data</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: []
})
export class TaskListComponent implements OnInit {
  tasks: ScrapingTask[] = [];
  displayedColumns: string[] = ['id', 'url', 'selector', 'status', 'actions'];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: () => {} // Error handled by ApiService
    });
  }

  executeTask(id: number) {
    this.apiService.executeTask(id).subscribe({
      next: () => this.ngOnInit(),
      error: () => {}
    });
  }

  viewData(id: number) {
    //this.router.navigate([`/data/${id}`]);
    this.router.navigate([`/tasks/${id}/data`]);
  }
}