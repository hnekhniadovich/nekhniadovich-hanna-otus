import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  languages = [
    'English',
    'Russian'
  ];

  levels = [
    '5',
    '10',
    '20',
    '50',
    '100'
  ];

  selectedLanguage: String = 'English';

  selectedLevel: String = '10';

  constructor() { }

  ngOnInit(): void {
  }

}
