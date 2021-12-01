import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Language, Word } from "../../app.interfaces";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorage = window.localStorage;
  private lang: Language = {display: 'Английский', value: 'ru|en'};
  private level = 5;

  constructor() {
  }

  getDictFromStorage(): Array<Word> {
    const arr = JSON.parse(this.localStorage.getItem(this.lang.value)|| '[]');
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
          this.localStorage.setItem(this.lang.value, JSON.stringify(dict));
        }
    });
  }

  clearDictStorage() {
    this.localStorage.removeItem(this.lang.value)
  }

  setLang(lang: Language) {
    this.lang = lang
  }

  getLang() {
    return this.lang
  }

  setLevel(level: number) {
    this.level = level
  }

  getLevel() {
    return this.level
  }


}
