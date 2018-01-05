import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";

import { MessageService } from "./message.service";

@Injectable()
export class HeroService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // getHeroes(callback) {
  //   this.http.get('http://localhost:3000/heroes').subscribe(data => {
  //     this.messageService.add('HeroService: fetched heroes');
  //     callback(data);
  //   })
  // }

  getHeroes(): Observable<any> {
    return this.http.get(this.url + 'heroes')
      .pipe(tap(heroes => {
        console.log(heroes);
        this.messageService.add('HeroService: fetched heroes.');
      }));
  }

  getHero(id): Observable<any> {
    return this.http.get(this.url + 'hero/' + id)
      .pipe(tap(hero => {
        console.log(hero);
        this.messageService.add(`HeroService: fetched hero id=${id}`);
      }))
  }

  updateHero(hero): Observable<any> {
    return this.http.post(this.url + 'updateHeroes', JSON.stringify(hero))
      .pipe(tap((heroes) => {
        console.log(heroes);
        this.messageService.add(`HeroService: updated hero id=${hero.id}`);
      }))
  }

  addHero(name): Observable<any> {
    return this.http.post(`${this.url}addHero`, JSON.stringify({
      'name': name
    })).pipe(tap(hero => {
      console.log(hero);
      this.messageService.add(`HeroService: added hero name=${hero.name}`);
    }))
  }

  deleteHero(hero): Observable<any> {
    return this.http.post(`${this.url}deleteHero`, JSON.stringify(hero)).pipe(tap(hero => {
      console.log(hero);
      this.messageService.add(`HeroService: deleted hero id=${hero.id}, name=${hero.name}`);
    }))
  }

  searchHeroes(term): Observable<any> {
    return this.http.get(`${this.url}heroes?name=${term}`).pipe(tap(heroes => {
      console.log(heroes);
      this.messageService.add(`found heroes matching "${term}"`);
    }))
  }

}
