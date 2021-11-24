import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, retry, switchMap } from 'rxjs/operators';
import { Word } from "../../app.interfaces";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private lang = 'ru|en';

  constructor(
    private http: HttpClient
  ) {}

  getDictItem(word: string): Observable<Word> {
    console.log('test word', word);
    return of(word)
      .pipe(
        switchMap(item => this.http.get(
          `https://api.mymemory.translated.net/get?q=${item}!&langpair=${this.lang}`,
        )),
        retry(3),
        map((item) => {
          let transation: string = item["responseData"]["translatedText"]
          console.log('item', item)
          return (
            {
              word,
              translate: transation
            }
          )
        })    
      );
  }
}