import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Segment } from 'app/models/segment';
import { Device } from 'app/models/device';

@Component({
  selector: 'app-segments-detail',
  templateUrl: './segments-detail.component.html',
  styleUrls: ['./segments-detail.component.css']
})
export class SegmentsDetailComponent implements OnInit {
  @Input() segment: Segment;
  marks: {latitude: number, longitude: number}[] = [];
  constructor() { }

  ngOnInit() {
    this.marks = this.getMarksFromSegment();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.segment = changes.segment.currentValue;
    this.marks = this.getMarksFromSegment();
  }

  getMarksFromSegment(): {latitude: number, longitude: number}[] {
    var device_marks: {latitude: number, longitude: number}[] = [];

    this.segment.devices.forEach((device: Device) => {
      device_marks.push({latitude: device.latitude, longitude: device.longitude});
    });

    return device_marks;
  }


}
