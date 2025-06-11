import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TaskDataComponent implements OnInit {
  taskId: number;
  data: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.apiService.getScrapedData(this.taskId).subscribe({
      next: (data) => this.data = data,
      error: (err) => this.snackBar.open(`Failed to load data: ${err.message}`, 'Close', { duration: 3000 })
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ApiService } from '../../services/api.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-task-data',
//   templateUrl: './task-data.component.html',
//   styleUrls: ['./task-data.component.css'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class TaskDataComponent implements OnInit {
//   taskId: number;
//   data: any[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private apiService: ApiService
//   ) {
//     this.taskId = +this.route.snapshot.paramMap.get('id')!;
//   }

//   ngOnInit() {
//     this.apiService.getScrapedData(this.taskId).subscribe({
//       next: (data) => this.data = data,
//       error: () => console.error('Failed to load scraped data.')
//     });
//   }
// }