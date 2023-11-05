import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface Category {
  name: string;
  code: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() onSearch = new EventEmitter<{}>();

  categories: Category[] | undefined;
  category: string = 'Electronics';
  searchContent: string = '';

  ngOnInit(): void {
    this.categories = [
      { name: 'Electronics', code: 'Electronics' },
      { name: 'Health', code: 'Health' },
      { name: 'Fashion', code: 'Fashion' },
      { name: 'Beauty', code: 'Beauty' },
      { name: 'Garden', code: 'Garden' },
      { name: 'Gaming', code: 'Gaming' },
    ];
  }

  searchHandler() {
    this.onSearch.emit({
      content: this.searchContent,
      category: this.category,
    });
  }
}
