import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
})
export class AutoCompleteComponent implements AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  @Output() onSetAddress = new EventEmitter<string>();
  @Input() initialAddress!: string;

  autocomplete: google.maps.places.Autocomplete | undefined;

  ngOnInit(): void {
    if (this.initialAddress && this.inputField.nativeElement) {
      this.inputField.nativeElement.value = this.initialAddress;
    }
  }

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      this.onSetAddress.emit(place?.formatted_address);
    });
  }
}
