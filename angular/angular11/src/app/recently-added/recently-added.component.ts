import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../services/translate/translate.service';
import { WordQueueService } from '../services/word-queue/word-queue.service';
import { StorageService } from '../services/storage/storage.service';
import { Word } from "../app.interfaces";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css'],
  providers: [
    TranslateService,
    WordQueueService,
    StorageService
  ]
})

export class RecentlyAddedComponent implements OnInit {

  dict!: Array<Word>;

  isAdd = false;
  canSave!: boolean;
  userInput = '';
  dictItems: Array<Word> = [];

  constructor(
    private translateService: TranslateService,
    private wordQueueService: WordQueueService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.dict = this.storageService.getDictFromStorage();
  }

  onTranslate(): void {
    this.canSave = false;
    this.wordQueueService.getDictItemsFromInput(this.userInput)
      .subscribe(
        data => this.dictItems.push(data),
        err => console.error(),
        () => this.canSave = true
      );
  }

  onSave(): void {
    this.storageService.addDictItems(this.dictItems);
    this.dictItems = [];
    this.userInput = '';
    this.isAdd = false;
    this.dict = this.storageService.getDictFromStorage();
  }

}