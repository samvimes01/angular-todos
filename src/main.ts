import 'zone.js/dist/zone';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TodosContainerComponent } from './features/todo/todoscontainer/todoscontainer.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [TodosContainerComponent],
  template: `
    <h1 class="title is-1 pl-3">{{name}} todo app</h1>
    <app-todoscontainer></app-todoscontainer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
