export interface ScrapingTask {
scrapingTaskId?: number;
url: string;
selector: string;
status?: string;
createdAt?: Date;
completedAt?: Date;
}