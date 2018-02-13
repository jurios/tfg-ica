import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Segment } from 'app/models/segment';
import { Device } from 'app/models/device';
import { Rule, ResultRule, ResultStatus } from 'app/models/rule';

import { SegmentService } from 'app/services/segment.service';
import { DeviceService } from 'app/services/device.service';
import { SimulatorService } from 'app/services/simulator.service';

@Component({
  selector: 'app-segment-simulator',
  templateUrl: './segment-simulator.component.html',
  styleUrls: ['./segment-simulator.component.css'],
  providers: [SegmentService, DeviceService, SimulatorService]
})
export class SegmentSimulatorComponent implements OnInit {
  @Input() segment: Segment = null;
  @Input() simulatorStatus: number = 0;
  @Input() params: {
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

  segmentElement: {segment: Segment, rules: Rule[], resultStatus: ResultStatus};
  deviceElements: {device: Device, rules: Rule[], resultStatus: ResultStatus}[];

  simulatorEnabled: boolean = false;

  displayedResultRules: ResultRule[] = null;

  deviceSelected: Device = null;
  errorMessage: string;

  resultMapMarks: {
    on: {id: number, longitude: number, latitude: number}[],
    off: {id: number, longitude: number, latitude: number}[]
  } = null

  constructor( private segmentService: SegmentService,
    private deviceService: DeviceService,
    private simulatorService: SimulatorService
  ) {
    this.segmentElement = {
     segment: this.segment,
     rules: null,
     resultStatus: null
    };

    this.deviceElements = new Array<{device: Device, rules: Rule[], resultStatus: ResultStatus}>();
  }

  ngOnInit() {
    this.segmentService.getSegmentRules(this.segment).subscribe(
      (rules) => {
        var orderedRules: Rule[] = this.simulatorService.sortRulesByPriority(rules);
        this.segmentElement.rules = orderedRules;
        this.segmentElement.resultStatus = this.simulatorService.applyPolices(orderedRules, this.getSimulatorParameters());
        this.displayedResultRules = this.segmentElement.resultStatus.resultRules;
      },
      error =>  this.errorMessage = <any>error
    );

    this.segment.devices.forEach((device) => {
      this.deviceService.getDeviceRules(device).subscribe(
        (rules) => {
          var orderedRules: Rule[] = this.simulatorService.sortRulesByPriority(rules);
          this.deviceElements.push({
            device: device,
            rules: orderedRules,
            resultStatus: this.simulatorService.applyPolices(orderedRules, this.getSimulatorParameters())
          });

        }
      );
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty('simulatorStatus')){
      if( this.simulatorEnabled && changes.simulatorStatus.currentValue == 0)
        this.turnOffSimulator();
      if(! this.simulatorEnabled && changes.simulatorStatus.currentValue == 1)
        this.turnOnSimulator();
    }
  }

  turnOnSimulator(): void {
    this.simulatorEnabled = true;
    console.log('Simulator enabled');
    this.applyPolices();
  }

  turnOffSimulator(): void {
    this.simulatorEnabled = false;
    console.log('Simulator disabled');
    this.clearResultRules();
  }

  onTableFilterChanged(event) {
    var value = event.target.value;
    if(value === 'segment')
      this.onChangeTarget(null);
    else{
      this.segment.devices.forEach((device) => {
        if(device.serial_id === value)
          this.onChangeTarget(device);
      });
    }
  }

  onChangeTarget(device: Device) {
    if(device){
      this.deviceSelected = device;
      this.deviceElements.forEach((deviceElement) => {
        if(deviceElement.device.id == device.id){
          this.displayedResultRules = deviceElement.resultStatus.resultRules;
        }
      });
    }else{
      this.deviceSelected = null;
      this.displayedResultRules = this.segmentElement.resultStatus.resultRules;
    }
    return 0;
  }

  applyPolices(): void{
    this.resultMapMarks = {
      on: new Array<{id: number, longitude: number, latitude: number}>(),
      off: new Array<{id: number, longitude: number, latitude: number}>()
    }
    this.segmentElement.resultStatus = this.simulatorService.applyPolices(this.segmentElement.rules, this.getSimulatorParameters());
    this.deviceElements.forEach((deviceElement, index) => {
      deviceElement.resultStatus = this.simulatorService.applyPolices(deviceElement.rules, this.getSimulatorParameters());
      if(deviceElement.resultStatus.intensity > 0)
        this.resultMapMarks.on.push({id: deviceElement.device.id, longitude: deviceElement.device.longitude, latitude: deviceElement.device.latitude});
      if(deviceElement.resultStatus.intensity <= 0)
        this.resultMapMarks.off.push({id: deviceElement.device.id, longitude: deviceElement.device.longitude, latitude: deviceElement.device.latitude});
    });
    this.onChangeTarget(this.deviceSelected);
  }

  clearResultRules(): void{
    this.resultMapMarks = {
      on: new Array<{id: number, longitude: number, latitude: number}>(),
      off: new Array<{id: number, longitude: number, latitude: number}>()
    }
    this.segmentElement.resultStatus = this.simulatorService.clearPolices(this.segmentElement.resultStatus);
    this.deviceElements.forEach((deviceElement, index) => {
      deviceElement.resultStatus = this.simulatorService.clearPolices(deviceElement.resultStatus);
    });
    this.onChangeTarget(this.deviceSelected);
  }

  getSimulatorParameters(): {
    enabled: boolean
    time: boolean,
    hours: number,
    minutes: number,
    raining: boolean,
    fog: boolean
  } {
    var result: {
      enabled: boolean
      time: boolean,
      hours: number,
      minutes: number,
      raining: boolean,
      fog: boolean
    } = {
      enabled: false,
      time: this.params.time,
      hours: this.params.hours,
      minutes: this.params.minutes,
      raining: this.params.raining,
      fog: this.params.fog
    };

    if(this.simulatorEnabled)
      result.enabled = true;
    else
      result.enabled = false;

    return result;
  }

}
