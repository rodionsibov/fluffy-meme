import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tutorials',
    loadComponent: () =>
      import('./components/tutorials-list/tutorials-list.component').then(
        (x) => x.TutorialsListComponent
      ),
  },
  {
    path: 'tutorials:id',
    loadComponent: () =>
      import('./components/tutorial-details/tutorial-details.component').then(
        (x) => x.TutorialDetailsComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-tutorial/add-tutorial.component').then(
        (x) => x.AddTutorialComponent
      ),
  },
];
