import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { SegmentService } from 'app/services/segment.service';
import { Segment } from 'app/models/segment';
import { Device } from 'app/models/device';

@Component({
  selector: 'app-segment-view',
  templateUrl: './segment-view.component.html',
  styleUrls: ['./segment-view.component.css'],
  providers: [SegmentService]
})
export class SegmentViewComponent implements OnInit {
  segment: Segment = null;
  marks: {latitude: number, longitude: number}[] = [];
  tabView = {
    dashboard: true,
    devices: false,
    rules: false,
    simulator: false
  }
  simulatorSelected: boolean = false;
  simulatorStatus: number = 0;
  selectedDevice: Device = null;
  simulatorParams: FormGroup;
  params: {
    time: boolean,
    hours: number,
    minutes: number,
    raining: boolean,
    fog: boolean
  } = {
    time: false,
    hours: 0,
    minutes: 0,
    raining: false,
    fog: false
  };

  constructor(  private segmentService: SegmentService,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private location: Location
              ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.segmentService.getSegment(+params['id']))
    .subscribe(segment => {
      this.segment = segment;
      this.marks = this.getMarksFromSegment();
    });

  }

  createForm(){
    this.simulatorParams = this.fb.group({
      'time': [false, Validators.required],
      'hours': [0, Validators.required],
      'minutes': [0, Validators.required],
      'raining': [false, Validators.required],
      'fog': [false, Validators.required]
    });
  }

  getMarksFromSegment(): {latitude: number, longitude: number}[] {
    var device_marks: {latitude: number, longitude: number}[] = [];

    this.segment.devices.forEach((device: Device) => {
      device_marks.push({latitude: device.latitude, longitude: device.longitude});
    });

    return device_marks;
  }

  onSelectTab(tab: string){
    if(tab === 'dashboard'){
      this.tabView.dashboard = true;
      this.tabView.devices = false;
      this.tabView.rules = false;
      this.tabView.simulator = false;
      this.selectedDevice = null;
    }

    if(tab === 'devices'){
      this.tabView.dashboard = false;
      this.tabView.devices = true;
      this.tabView.rules = false;
      this.tabView.simulator = false;
      this.selectedDevice = null;
    }

    if(tab === 'rules'){
      this.tabView.dashboard = false;
      this.tabView.devices = false;
      this.tabView.rules = true;
      this.tabView.simulator = false;
      this.selectedDevice = null;
    }

    if(tab == 'simulator'){
      this.tabView.dashboard = false;
      this.tabView.devices = false;
      this.tabView.rules = false;
      this.tabView.simulator = true;
      this.selectedDevice = null;
    }

  }

  onDeviceSelected(device: Device): void {
    this.simulatorSelected = false;
    this.selectedDevice = device;
  }

  onSimulatorStatusChange(action: number): void {
    this.simulatorStatus = action;
    this.params = this.prepareSimulatorParams();
  }

  prepareSimulatorParams(): any {
    const formModel = this.simulatorParams.value;

    const saveParams: {
      time: boolean,
      hours: number,
      minutes: number,
      raining: boolean,
      fog: boolean
    } = {
      time: formModel.time,
      hours: parseInt(formModel.hours),
      minutes: parseInt(formModel.minutes),
      raining: formModel.raining as boolean,
      fog: formModel.fog as boolean
    };

    console.log(saveParams);

    return saveParams;
  }
}
