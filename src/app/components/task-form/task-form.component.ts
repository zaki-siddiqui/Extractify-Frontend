// File: Extractify.Frontend/src/app/task-form/task-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ]
})
export class TaskFormComponent implements OnInit {
  task = {
    url: '',
    selector: '',
    imageSelector: '',
    status: 'Pending'
  };
  urlControl = new FormControl('', { nonNullable: true });
  useAdvancedMode = false;
  selectorControl = new FormControl('');
  imageSelectorControl = new FormControl('');
  suggestedSelectors: Observable<string[]> = of([]);
  suggestedImageSelectors: Observable<string[]> = of([]);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.selectorControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', ['h1', 'h2', 'h3', 'p', 'a', '.title', '.content', '.text', '.author', '.tag']))
    ).subscribe(selectors => this.suggestedSelectors = of(selectors));

    this.imageSelectorControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', ['img', '.image', '.thumbnail']))
    ).subscribe(selectors => this.suggestedImageSelectors = of(selectors));
  }

  onUrlBlur() {
    const url = this.urlControl.value;
    if (!url.match(/^https?:\/\/.+/)) {
      this.snackBar.open('Invalid URL.', 'Close', { duration: 3000 });
      return;
    }
    if (this.useAdvancedMode && url) {
      this.apiService.getSuggestedSelectors(url).subscribe({
        next: (selectors) => {
          this.suggestedSelectors = of(selectors.filter(s => !s.includes('img')));
          this.suggestedImageSelectors = of(selectors.filter(s => s.includes('img')));
          if (!selectors.length) {
            this.suggestedSelectors = of(['h1', 'h2', 'h3', 'p', '.text']);
            this.suggestedImageSelectors = of(['img']);
          }
        },
        error: () => this.snackBar.open('Failed to fetch selectors.', 'Close', { duration: 3000 })
      });
    }
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    const url = this.urlControl.value;
    if (!url.match(/^https?:\/\/.+/)) {
      this.snackBar.open('Invalid URL.', 'Close', { duration: 3000 });
      return;
    }
    this.task.url = url;
    if (this.useAdvancedMode) {
      this.task.selector = this.selectorControl.value || '';
      this.task.imageSelector = this.imageSelectorControl.value || '';
    } else {
      this.task.selector = '';
      this.task.imageSelector = '';
    }
    this.apiService.createTask(this.task).subscribe({
      next: () => {
        this.snackBar.open('Task created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/tasks']);
      },
      error: () => this.snackBar.open('Failed to create task.', 'Close', { duration: 3000 })
    });
  }
}



// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { ApiService } from '../../services/api.service';
// import { ScrapingTask } from '../../models/scraping-task.model';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-task-form',
//   standalone: true,
//   imports: [
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatSnackBarModule
//   ],
//   template: `
//     <form (ngSubmit)="onSubmit()">
//       <mat-form-field>
//         <mat-label>URL</mat-label>
//         <input matInput [(ngModel)]="task.url" name="url" required>
//       </mat-form-field>
//       <mat-form-field>
//         <mat-label>CSS Selector</mat-label>
//         <input matInput [(ngModel)]="task.selector" name="selector" required>
//       </mat-form-field>
//       <button mat-raised-button color="primary" type="submit">Create Task</button>
//     </form>
//   `,
//   styles: []
// })
// export class TaskFormComponent {
//   task: ScrapingTask = { url: '', selector: '' };

//   constructor(private apiService: ApiService, private router: Router) {}

//   onSubmit() {
//     this.apiService.createTask(this.task).subscribe({
//       next: () => this.router.navigate(['/tasks']),
//       error: () => {} // Error handled by ApiService
//     });
//   }
// }