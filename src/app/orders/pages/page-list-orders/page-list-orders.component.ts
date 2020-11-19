import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order.enum';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss']
})
export class PageListOrdersComponent implements OnInit, OnDestroy {
  public listHeaders: string[];
  // public collection: Order[];
  public collection$: Observable<Order[]>;
  public states = Object.values(StateOrder);
  private obs = new Observable((subscribers) => {
    subscribers.next('hey');
  });
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private os: OrdersService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.sub = this.obs.subscribe((data) => {
      console.log(data);
    });

    this.listHeaders = [
      "Type",
      "Client",
      "NbDay",
      "TjmHT",
      "TotalHT",
      "TotalTTC",
      "State"
    ];

    this.route.data.subscribe((param) => {
    });

    // this.os.collection.subscribe((data) => {
    //   this.collection = data;
    // });

    this.collection$ = this.os.collection;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe(); // unsubscribe example, useless in that case
  }

  public changeState(item: Order, event): void {
    const state = event.target.value;
    this.os.changeState(item, state).subscribe((res) => {
      // test errors
      item.state = res.state;
      this.cd.detectChanges();
    });
  }

}
