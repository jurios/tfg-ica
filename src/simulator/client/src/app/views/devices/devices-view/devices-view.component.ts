import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { DeviceService } from 'app/services/device.service';
import { SegmentService } from 'app/services/segment.service';

import { Device } from 'app/models/device';
import { Segment } from 'app/models/segment';

@Component({
  selector: 'app-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.css'],
  providers: [DeviceService, SegmentService]
})
export class DevicesViewComponent implements OnInit {
  device: Device = null;
  segment: Segment = null;
  marks: {latitude: number, longitude: number}[] = [];
  tabView = {
    dashboard: true,
    devices: false,
    rules: false,
    simulator: false
  }

  constructor( private deviceService: DeviceService,
    private segmentService: SegmentService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.deviceService.getDevice(+params['id']))
    .subscribe(device => {
      this.device = device;
      if(this.device.segment_id)
        this.segmentService.getSegment(this.device.segment_id).subscribe(
          segment => this.segment = segment
        );
      this.marks = [{ latitude: this.device.latitude, longitude: this.device.longitude }];
    });

  }

  onSelectTab(tab: string){
    if(tab === 'dashboard'){
      this.tabView.dashboard = true;
      this.tabView.rules = false;
      this.tabView.simulator = false;
    }

    if(tab === 'rules'){
      this.tabView.dashboard = false;
      this.tabView.rules = true;
      this.tabView.simulator = false;
    }

    if(tab == 'simulator'){
      this.tabView.dashboard = false;
      this.tabView.rules = false;
      this.tabView.simulator = true;
    }

  }

}
