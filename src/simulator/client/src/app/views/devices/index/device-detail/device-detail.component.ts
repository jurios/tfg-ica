import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Device } from 'app/models/device';

import { DeviceService } from 'app/services/device.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css'],
  providers: [DeviceService]
})
export class DeviceDetailComponent implements OnInit, OnChanges {
  @Input() device: Device = null;
  @Output() deviceDeletedEvent: EventEmitter<any> = new EventEmitter<any>();
  position: {latitude: number, longitude: number};
  marks: {latitude: number, longitude: number}[] = [];

  errorMessage: string;

  constructor(private deviceService: DeviceService, private router: Router) { }

  ngOnInit() {
    this.position = { latitude: this.device.latitude, longitude: this.device.longitude};
    this.marks[0] = this.position;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.device = changes.device.currentValue;
    this.position = { latitude: this.device.latitude, longitude: this.device.longitude};
    this.marks = new Array(this.position);
  }

  onDeleteDevice():void {
    this.deviceService.deleteDevice(this.device).subscribe(
      data => {
        this.deviceDeletedEvent.emit();
      },
      error =>  this.errorMessage = <any>error
    );
  }

}
