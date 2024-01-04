import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { OffersService } from '../services/offers.service';
import { MessagesService } from '../services/messages.service';
import { MessageService, Message } from 'primeng/api';
import { of } from 'rxjs';
import { OfferItem, OffersRes } from '../shared/models/offers.model';
import { MessagesModule } from 'primeng/messages';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { DropdownModule } from 'primeng/dropdown';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let offersServiceSpy: jasmine.SpyObj<OffersService>;
  let messagesServiceSpy: jasmine.SpyObj<MessagesService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const offersSpy = jasmine.createSpyObj('OffersService', [
      'offers',
      'getActiveOffers',
      'getFilteredOffers',
    ]);
    const messagesSpy = jasmine.createSpyObj('MessagesService', ['messages$']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent, SearchBarComponent],
      providers: [
        { provide: OffersService, useValue: offersSpy },
        { provide: MessagesService, useValue: messagesSpy },
        { provide: MessageService, useValue: messageSpy },
      ],
      imports: [MessagesModule, DropdownModule],
    });

    offersServiceSpy = TestBed.inject(
      OffersService
    ) as jasmine.SpyObj<OffersService>;
    messagesServiceSpy = TestBed.inject(
      MessagesService
    ) as jasmine.SpyObj<MessagesService>;
    messageServiceSpy = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFilteredOffers on customSearchHandler', () => {
    const options = { category: 'Electronics' };

    component.customSearchHandler(options);

    expect(offersServiceSpy.getFilteredOffers).toHaveBeenCalledWith(options);
  });
});
