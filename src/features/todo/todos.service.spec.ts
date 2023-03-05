import { TestBed } from '@angular/core/testing';
import { StorageService } from 'src/globals/storage.service';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;
  let valueServiceSpy: jasmine.SpyObj<StorageService>;
  const stubValue = [
    { id: 123, label: 'mocked1', isDone: false },
    { id: 456, label: 'mocked2', isDone: false },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StorageService', ['get', 'set']);
    spy.get.withArgs('tdl_todos').and.returnValue(stubValue);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [TodosService, { provide: StorageService, useValue: spy }],
    });
    // Inject both the service-to-test and its (spy) dependency
    service = TestBed.inject(TodosService);
    valueServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  it('should read storage on init', () => {
    expect(valueServiceSpy.get).toHaveBeenCalledOnceWith('tdl_todos');
  });

  it('should get list of items', (done: DoneFn) => {
    service.getList().subscribe((list) => {
      expect(list).toEqual(stubValue);
      done();
    });
  });

  it('should get filtered list of items', (done: DoneFn) => {
    service.search$.next('ed2');
    service.getFilteredList().subscribe((list) => {
      expect(list).toEqual([stubValue[1]]);
      done();
    });
  });

  it('should add todo item', (done: DoneFn) => {
    service.addItem('mocked3', () => 789);
    service.getList().subscribe((list) => {
      expect(list).toEqual([
        ...stubValue,
        { id: 789, label: 'mocked3', isDone: false },
      ]);
      done();
    });
  });

  it('should mark a todo item as done', (done: DoneFn) => {
    service.toggleItem(123, true);
    service.getList().subscribe((list) => {
      expect(list).toEqual([{ ...stubValue[0], isDone: true }, stubValue[1]]);
      done();
    });
  });

  it('should update a todo item label', (done: DoneFn) => {
    service.editItem(123, 'mocked1Edited');
    service.getList().subscribe((list) => {
      expect(list).toEqual([
        { ...stubValue[0], label: 'mocked1Edited' },
        stubValue[1],
      ]);
      done();
    });
  });

  it('should save all items on list change', (done: DoneFn) => {
    service.addItem('mocked3', () => 789);
    service.getList().subscribe((list) => {
      expect(valueServiceSpy.set).toHaveBeenCalledWith('tdl_todos', [
        ...stubValue,
        { id: 789, label: 'mocked3', isDone: false },
      ]);
      done();
    });
  });
});
