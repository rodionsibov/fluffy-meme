import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-tutorial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  private tutorialService = inject(TutorialService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    published: false,
  });

  submitted = false;
  success = false;
  errors = false;

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
        this.success = true;
        this.errors = false;
      },
      error: (e) => {
        console.error(e);
        this.errors = true;
        this.success = false;
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.errors = false;
    this.form.reset();
  }

  newTutorial(): void {
    this.submitted = false;
  }
}
