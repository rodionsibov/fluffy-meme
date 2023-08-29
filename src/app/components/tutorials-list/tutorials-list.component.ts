import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialService } from 'src/app/services/tutorial.service';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorials-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MarkdownModule],
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll$.subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updatePublished(status:any ): void {
    console.log(status)
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
    };

    this.tutorialService.update$(this.currentTutorial.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentTutorial.published = status;
      },
      error: (e) => console.error(e),
    });
  }

  updateTutorial(): void {
    this.tutorialService
      .update$(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e),
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete$(this.currentTutorial.id).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList()
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll$().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.tutorialService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
