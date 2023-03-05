import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { TodolistComponent } from '../todolist/todolist.component';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todoscontainer',
  templateUrl: './todoscontainer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [TodosService],
  imports: [NgIf, NgTemplateOutlet, AsyncPipe, FormsModule, TodolistComponent],
})
export class TodosContainerComponent {
  todosService = inject(TodosService);

  vm$ = combineLatest([
    this.todosService.getList(),
    this.todosService.getFilteredList(),
  ]).pipe(
    map(([todos, filtered]) => {
      return {
        isEmpty: !todos.length,
        isEmptyFilter: !filtered.length,
      };
    })
  );

  onSearch(event: string): void {
    this.todosService.search$.next(event);
  }
}
