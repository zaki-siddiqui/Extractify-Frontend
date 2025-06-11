// File: Extractify.Frontend/Extractify.Frontend/src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ScrapingTask } from '../models/scraping-task.model';
import { ScrapedData } from '../models/scraped-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7142/api';

  constructor(private http: HttpClient) {}

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ScrapingTasks`, task);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ScrapingTasks`);
  }

  getTask(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ScrapingTasks/${id}`);
  }

  executeTask(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/ScrapingTasks/${id}/execute`, null);
  }

  getScrapedData(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ScrapingTasks/${id}/data`);
  }

  getSuggestedSelectors(url: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/ScrapingTasks/suggest-selectors?url=${encodeURIComponent(url)}`);
  }
}