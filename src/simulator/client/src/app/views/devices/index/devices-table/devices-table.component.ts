import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Device } from 'app/models/device';

@Component({
  selector: 'app-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.css']
})
export class DevicesTableComponent implements OnInit {
  @Input() devices: Device[];
  @Output() onDeviceSelected: EventEmitter<Device> = new EventEmitter<Device>();
  constructor() { }

  ngOnInit() {
  }

  onDeviceClicked(device: Device): void {
    this.onDeviceSelected.emit(device);
  }

}
