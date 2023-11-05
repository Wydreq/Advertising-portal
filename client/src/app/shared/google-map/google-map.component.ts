import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  apiLoaded!: Observable<boolean>;

  @Input() coords: any;

  options: google.maps.MapOptions = {
    center: { lng: 20, lat: 50 },
    zoom: 12,
  };

  circle: google.maps.LatLngLiteral = { lat: 10, lng: 15 };
  radius = 1500;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.options = {
      center: { lng: this.coords[0], lat: this.coords[1] },
      zoom: 12,
    };
    this.circle = {
      lng: this.coords[0],
      lat: this.coords[1],
    };
    this.apiLoaded = this.httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBOHNVt6lhic_Egl8fjemLAkTDkUJSlzd0',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
