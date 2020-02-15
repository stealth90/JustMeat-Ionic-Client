import { Component, Input, EventEmitter , Output} from '@angular/core';

enum COLORS {
  GREY = '#E0E0E0',
  YELLOW = '#FFCA28'
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})

export class RatingComponent {
  @Input() rating: number ;
  @Input() readOnly = false;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  rate(index: number) {
    if(!this.readOnly) {
      this.rating = index;
      this.ratingChange.emit(this.rating);
    }
   }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }
    switch (this.rating) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return COLORS.YELLOW;
      default:
        return COLORS.GREY;
    }
  }
}
