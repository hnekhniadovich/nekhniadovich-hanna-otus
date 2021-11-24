import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Word } from "../../app.interfaces";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorage = window.localStorage;
  private lang = 'ru|en';

  constructor() {
  }

  getDictFromStorage(): Array<Word> {
    const arr = JSON.parse(this.localStorage.getItem(this.lang)|| '[]');
    return arr instanceof Array ? arr : [];
  }

  addDictItems(dictItems: Array<Word>) {
    const dict = this.getDictFromStorage();
    from(dictItems)
      .pipe(
        filter(item => !dict.find(({word}) => word === item.word)),
        map(item => dict.unshift(item))
      ).subscribe({
        complete: () => {
          this.localStorage.setItem(this.lang, JSON.stringify(dict));
        }
    });
  }

}
