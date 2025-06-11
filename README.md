# Extractify-Frontend
An Angular 19 frontend for Extractify, a web scraping application that allows users to create, execute, and view web scraping tasks. The UI supports a hybrid scraping approach: default mode for automatic data extraction and advanced mode with custom CSS selectors. It integrates with the Extractify-Api backend.

# Table of Contents

Features
Prerequisites
Setup
Running the Application
Usage
Dependencies
Project Structure
Contributing
License

# Features

User-Friendly UI:
Create scraping tasks with a form (task-form.component.ts, artifact_id: 03670031-496d-4afc-9d72-bdeeec95c9ea).
View task results in a data table (task-data.component.ts, artifact_id: af85e463-98b2-4eb1-a183-01d48a03c52a).


Hybrid Scraping:
Default Mode: Scrapes text and images without user-defined selectors.
Advanced Mode: Supports custom CSS selectors with autocomplete suggestions.


Material Design: Uses Angular Material for a modern, responsive UI.
API Integration: Communicates with Extractify-Api at https://localhost:7142.

# Prerequisites

Node.js 20.x
Angular CLI 19.x
Git
Backend: Extractify-Api running at https://localhost:7142
Optional: VS Code with Angular extensions

# Setup

Clone the Repository:git clone https://github.com/<your-username>/Extractify-Frontend.git
cd Extractify-Frontend


Install Dependencies:npm install



# Running the Application

Ensure Backend is Running:
Start Extractify-Api at https://localhost:7142.


Run the Frontend:ng serve --open


Access at http://localhost:4200.



# Usage

Create a Task:
Navigate to http://localhost:4200/task-form.
Enter a URL (e.g., https://quotes.toscrape.com).
Default Mode:
Leave “Use advanced settings” unchecked.
Click “Create Task”.


Advanced Mode:
Check “Use advanced settings”.
Select CSS selectors (e.g., .quote .text for text, img for images) from autocomplete.
Click “Create Task”.




Execute Task:
Go to http://localhost:4200/tasks.
Click “Execute” for a task (triggers POST /api/ScrapingTasks/{id}/execute).


View Results:
Navigate to http://localhost:4200/tasks/{id}/data.
View scraped text and images in a table.



# Dependencies

Angular Packages:
@angular/core: 19.0.0
@angular/material: 19.0.0
@angular/cdk: 19.0.0
@angular/forms: 19.0.0


# Other:
rxjs: 7.8.1


See package.json for full list.

# Project Structure
Extractify-Frontend/
├── src/
│   ├── app/
│   │   ├── task-form/        # Task creation component
│   │   ├── task-data/        # Task results component
│   │   ├── api.service.ts    # API communication
│   ├── assets/               # Static assets
│   ├── styles.css            # Global styles
├── angular.json              # Angular configuration
├── package.json              # Dependencies
├── README.md                 # This file
├── .gitignore                # Git ignore rules

Contributing

Fork the repository.
Create a feature branch: git checkout -b feature/your-feature.
Commit changes: npm run lint && git commit -m "Add your feature".
Push: git push origin feature/your-feature.
Open a pull request on GitHub.

License
MIT License. See LICENSE for details.

