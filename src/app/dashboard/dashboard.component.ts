import { Component, OnInit } from '@angular/core';

import { HeroService } from "../hero.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes;

  getHeroes() {
    this.heroService.getHeroes().subscribe(data => {
      this.heroes = data.slice(0, 4);
    })
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

}
