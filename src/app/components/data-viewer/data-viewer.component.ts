import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ApiService } from '../../services/api.service';
import { ScrapedData } from '../../models/scraped-data.model';

@Component({
selector: 'app-data-viewer',
standalone: true,
imports: [CommonModule, RouterLink],
templateUrl: './data-viewer.component.html',
styleUrls: ['./data-viewer.component.scss']
})
export class DataViewerComponent implements OnInit {
taskId: number;
scrapedData: ScrapedData[] = [];

constructor(private route: ActivatedRoute, private apiService: ApiService) {
this.taskId = +this.route.snapshot.paramMap.get('id')!;
}

ngOnInit() {
this.loadScrapedData();
}

loadScrapedData() {
this.apiService.getScrapedData(this.taskId).subscribe({
next: (data) => this.scrapedData = data,
error: (err) => alert('Error loading scraped data: ' + err.message)
});
}
}