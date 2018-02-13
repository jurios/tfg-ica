import { Component, OnInit, Input } from '@angular/core';

import { SegmentService } from 'app/services/segment.service';
import { DeviceService } from 'app/services/device.service';

import { Segment } from 'app/models/segment';
import { Device } from 'app/models/device';
import { Rule } from 'app/models/rule';

@Component({
  selector: 'app-rules-table',
  templateUrl: './rules-table.component.html',
  styleUrls: ['./rules-table.component.css'],
  providers: [SegmentService, DeviceService]
})
export class RulesTableComponent implements OnInit {
  @Input() segment: Segment = null;
  @Input() device: Device = null;
  rules: Rule[] = null;
  errorMessage: string;

  constructor( private segmentService: SegmentService, private deviceService: DeviceService) { }

  ngOnInit() {
    if(this.segment)
      this.getSegmentRules();
    else if(this.device)
      this.getDeviceRules();
  }

  getSegmentRules(): void {
    this.segmentService.getSegmentRules(this.segment).subscribe(
      rules => {
        this.rules = rules;
      },
      error =>  this.errorMessage = <any>error
    )
  }

  getDeviceRules(): void {
    this.deviceService.getDeviceRules(this.device).subscribe(
      rules => {
        this.rules = rules;
      },
      error =>  this.errorMessage = <any>error
    )
  }

}
