import { Component, OnInit } from '@angular/core';

import { HeroService } from './hero.service';

import { Hero } from './hero'

@Component({
    selector: 'hero-list',
    templateUrl: 'hero-list.component.html',
    styleUrls: ['hero-list.component.css']
})

export class HeroListComponent implements OnInit{
  
  heroes: Hero[]
  selectedHero: Hero

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }
}