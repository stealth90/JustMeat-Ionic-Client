import { NgModule } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';

@NgModule({
    imports: [
        RatingComponent
    ],
    declarations: [
        RatingComponent
    ],
    exports: [RatingComponent]
})

export class  SharedModule { }
