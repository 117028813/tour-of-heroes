import { Component, OnInit } from '@angular/core';

import { HeroService } from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes;

  getHeroes() {
    this.heroService.getHeroes().subscribe(data => {
      this.heroes = data;
    })
  }

  add(name) {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero(name).subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  delete(hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

}
