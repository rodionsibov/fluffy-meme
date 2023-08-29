import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TutorialService } from 'src/app/services/tutorial.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tutorial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MarkdownModule],
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  private tutorialService = inject(TutorialService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    title: [
      'How to use Angular directives to render markdown documents',
      Validators.required,
    ],
    description: ['', Validators.required],
    published: false,
  });

  submitted = false;

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
    this.tutorialService.create$(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  newTutorial(): void {
    this.submitted = false;
  }
}
