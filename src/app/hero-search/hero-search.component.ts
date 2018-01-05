import { Component, OnInit } from '@angular/core';

import { HeroService } from "../hero.service";


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes;

  search(term) {
    if (!term.trim()) {
      this.heroes = [];
    } else {
      this.heroService.searchHeroes(term).subscribe(heroes => {
        this.heroes = heroes;
      })
    }

  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {

  }

}
