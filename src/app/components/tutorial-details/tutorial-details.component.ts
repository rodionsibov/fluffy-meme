import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-tutorial-details',
  standalone: true,
  imports: [CommonModule, MarkdownModule, RouterLink],
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent {
  tutorial!: Tutorial;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tutorialService.get$(id).subscribe({
      next: (data) => {
        this.tutorial = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
