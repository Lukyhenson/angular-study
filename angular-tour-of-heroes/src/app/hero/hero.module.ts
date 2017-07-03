import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from './hero.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        HeroDetailComponent,
        HeroListComponent
    ],
    exports: [
        HeroDetailComponent,
        HeroListComponent
    ],
    providers: [HeroService]
})
export class HeroModule { }
