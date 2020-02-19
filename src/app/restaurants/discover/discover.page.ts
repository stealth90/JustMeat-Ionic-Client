import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/orders/order.model';
import { OrderService } from 'src/app/orders/order.service';
import { Restaurant } from '../restaurant.model';
import { RestaurantsService } from '../restaurants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  citySearched = '';
  slideOpts = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);
          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
           // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) { translateX = 0; }
          if (Math.abs(translateY) < 0.001) {translateY = 0; }
          if (Math.abs(translateZ) < 0.001) {translateZ = 0; }
          if (Math.abs(rotateY) < 0.001) {rotateY = 0; }
          if (Math.abs(rotateX) < 0.001) {rotateX = 0; }
          // tslint:disable-next-line: max-line-length
          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) {$shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
            if ($shadowAfterEl.length) {$shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
          }
        }
         // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  };
  public loadedOrders: Order[] = [];
  public loadedRestaurant: Restaurant[] = [];
  private ordersSub: Subscription;
  private restaurantsSub: Subscription;
  isLoading = false;

  constructor(
    private orderService: OrderService,
    private restaurantService: RestaurantsService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.restaurantsSub = this.restaurantService.restaurants.subscribe(restaurants => {
      this.loadedRestaurant = [...restaurants];
      this.ordersSub = this.orderService.orders.subscribe(orders => {
        this.loadedOrders = [...orders];
      });
    });
  }

  ionViewWillEnter() {
    this.restaurantService.fetchRestaurants().subscribe(() => {
      this.orderService.fetchOrders().subscribe(() => {
        this.isLoading = false;
      });
    });
  }
// TODO
  ordersExist() {
    if (this.loadedOrders) {
      return true;
    }
    return false;
  }


  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  getRestaurantName(id: string) {
    for (const rest of this.loadedRestaurant) {
      if (rest._id === id) { return rest.name; }
    }
  }
  getRestaurantAvatar(id: string) {
    for (const rest of this.loadedRestaurant) {
      if (rest._id === id) {return rest.avatar; }
    }
  }

  getPlates(id: string) {
    let plates = '';
    for (const order of this.loadedOrders) {
      if ( order._id === id) {
        for (const plate of order.orderItems) {
          plates += `${plate.quantity} x ${plate.name},`;
        }
      }
    }
    return plates.slice(0, -1);
  }

  onSearchRestaurants(city: string) {
    this.router.navigate(['restaurants/tabs/discover/restaurants-detail', city]);
  }

  ngOnDestroy() {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
    if (this.restaurantsSub) {
      this.restaurantsSub.unsubscribe();
    }
  }
}

