import { NgModule } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        RatingComponent
    ],
    exports: [RatingComponent]
})

export class  SharedModule { }
