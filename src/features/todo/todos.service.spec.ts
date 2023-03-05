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

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [TodosService, { provide: StorageService, useValue: spy }],
    });
    // Inject both the service-to-test and its (spy) dependency
    service = TestBed.inject(TodosService);
    valueServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
    valueServiceSpy.get.withArgs('tdl_todos').and.returnValue(stubValue);
  });

  it('should read storage on init', () => {
    expect(valueServiceSpy.get).toHaveBeenCalledOnceWith('tdl_todos');
  });

  it('should get list of items', (done: DoneFn) => {
    service.getList().subscribe((list) => {
      expect(list).toEqual([]);
      // expect(list).toEqual(stubValue);
      done();
    });
  });
});
