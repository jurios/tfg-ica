import { Component, OnInit, HostListener } from '@angular/core';

import { Device } from '../../../models/device';

import { DeviceService } from '../../../services/device.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [DeviceService]
})
export class IndexComponent implements OnInit {
  devices: Device[];
  selectedDevice: Device = null;
  errorMessage: string;

  pageHeaderButton: {} = {
    icon: "fa fa-plus",
    label: "Afegir dipositiu",
    route: "/devices/new"
  };

  constructor(private deviceService: DeviceService ) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.deviceService.getDevices().subscribe(
      devices => this.devices = devices,
      error =>  this.errorMessage = <any>error
    );
  }

  onDeviceSelected(device): void {
    this.selectedDevice = device;
  }

  onDeviceDeleted(): void {
    this.getDevices();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let x = event.keyCode;
    if (x === 27) {
        this.selectedDevice = null;
    }
  }

}
