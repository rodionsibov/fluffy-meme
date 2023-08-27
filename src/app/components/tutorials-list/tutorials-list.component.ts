import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialService } from 'src/app/services/tutorial.service';
import { map } from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tutorials-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent {
  tutorialService = inject(TutorialService);

  tutorials$ = this.tutorialService.getAll$.pipe(
    map((x) => x.map((t) => ({ ...t, title: `${t.title} and more` })).reverse())
  );
}
