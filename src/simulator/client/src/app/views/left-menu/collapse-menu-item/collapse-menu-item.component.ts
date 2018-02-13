import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapse-menu-item',
  templateUrl: './collapse-menu-item.component.html',
  styleUrls: ['./collapse-menu-item.component.css']
})
export class CollapseMenuItemComponent implements OnInit {
  @Input() itemTitle: string;
  @Input() subItems: [{}];
  public isCollapsed:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

}
