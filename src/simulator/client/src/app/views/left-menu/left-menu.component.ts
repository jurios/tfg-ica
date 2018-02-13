import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  private menuItems: [{}] = [
    {
      title: 'Components',
      subtitles: [
        {title: 'Faroles', route: "/devices"},
        {title: 'Segments', route: "/segments"}
      ]
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
