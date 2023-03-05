import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { TodoItem } from '../../../models/todoitem.interface';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
})
export class TodoItemComponent {
  @Input() item: TodoItem;
  @Output() toggle = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<number>();
  @Output() edited = new EventEmitter<string>();
  @ViewChild('itemLbl') lbl: ElementRef;

  editable = false;

  onEdit(): void {
    this.edited.emit(this.lbl.nativeElement.innerHTML);
    this.editable = false;
  }
}
