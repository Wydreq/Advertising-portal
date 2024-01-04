import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [DropdownModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event', () => {
    spyOn(component.onSearch, 'emit');

    const searchContent = 'Test Content';
    const category = 'Electronics';

    component.searchContent = searchContent;
    component.category = category;

    component.searchHandler();

    expect(component.onSearch.emit).toHaveBeenCalledWith({
      content: searchContent,
      category: category,
    });
  });
});
