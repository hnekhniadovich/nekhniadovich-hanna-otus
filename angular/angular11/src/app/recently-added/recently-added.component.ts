import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  newWords = [
    {
      date: 'November 1st, 2021',
      words: [
        'to apply - добавлять',
        'education - образование',
        'to go - идти',
        'responsible - ответственный'
      ]
    },
    {
      date: 'November 15th, 2021',
      words: [
        'to come - приходить',
        'to see - видеть',
        'to win - побеждать'
      ]
    }
  ];

  isAdd: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.isAdd = !this.isAdd;
  }

}
