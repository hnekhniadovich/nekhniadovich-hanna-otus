import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navLinks = [
    { path: 'add', label: 'Recently Added'},
    { path: 'go', label: 'Go'},
    { path: 'settings', label: 'Settings'}
  ];

  constructor() {}

  ngOnInit() {
  }

}
