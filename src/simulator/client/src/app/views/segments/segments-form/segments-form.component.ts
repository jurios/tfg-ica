import { Component, OnInit, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

import { Segment } from 'app/models/segment';
import { Rule } from 'app/models/rule';

import { SegmentService } from 'app/services/segment.service';
import { RuleService } from 'app/services/rule.service';

@Component({
  selector: 'app-segments-form',
  templateUrl: './segments-form.component.html',
  styleUrls: ['./segments-form.component.css'],
  providers: [SegmentService, RuleService]
})
export class SegmentsFormComponent implements OnInit {
  segmentForm: FormGroup;
  segment: Segment;
  rule: Rule;
  segmentTypes: {}[][] = [];
  segmentTypeLevel: number;

  form_states: {default: boolean, start_coord: boolean, end_coord: boolean}
    = {default: true, start_coord: false, end_coord: false};

  errorMessage: string;

  constructor(  private location: Location,
                private fb: FormBuilder,
                private router: Router,
                private segmentService: SegmentService,
                private ruleService: RuleService
              ) {
    this.createForm();
  }

  ngOnInit() {
    this.segmentService.getSegmentTypes(null).subscribe(
      segmentTypes => {
        this.segmentTypes[0] = segmentTypes
        this.segmentTypeLevel = 0;
      },
      error => this.errorMessage = <any>error
    );
  }

  createForm(){
    this.segmentForm = this.fb.group({
      'segmentId': [this.randomString(10), Validators.required],
      "segmentType_0": '',
      "segmentType_1": '',
      "segmentType_2": '',
      "rule": this.fb.group({
        "max_lumens": 0,
        "min_lumens": 0,
        "allow_hibernate": false,
        "allow_total_hibernate": false,
        "delay_hibernate": 0
      }),
      'start_coord': ['', Validators.required],
      'end_coord': ['', Validators.required]
    });
  }

  randomString(length: number): string {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  onSubmit(){
    this.segment = this.prepareSaveSegment();
    this.rule = this.prepareSaveRule();

    if(this.segment.id == null)
      this.segmentService.createSegment(this.segment).subscribe(
        segment => {
          this.segment = segment;
          this.rule.segment = this.segment;
          this.rule.segment_id = this.segment.id;
          this.ruleService.createRule(this.rule).subscribe(
            rule => {
                this.router.navigate(['/segments']);
            },
            error => this.errorMessage = <any>error
          );
        },
        error => this.errorMessage = <any>error
      );
  }

  prepareSaveSegment(): Segment {
    const formModel = this.segmentForm.value;

    const saveSegment: Segment = {
      id: null,
      devices: [],
      devices_ids: [],
      segment_id: formModel.segmentId,
      segment_type_id: formModel.segmentType_2,
    };

    return saveSegment;
  }

  prepareSaveRule(): Rule {
    const formModel = this.segmentForm.value;

    const defaultRule: Rule = {
      id: null,
      preference: false,
      priority: 1,
      inherit_hibernate: false,
      allow_hibernate: formModel.rule.allow_hibernate,
      total_hibernate: formModel.rule.allow_total_hibernate,
      delay_hibernate: formModel.rule.delay_hibernate,
      inherit_intensity: false,
      intensity: 100,
      intensity_value: 'absolute',
      intensity_sign: '+',
      inherit_schedule: false,
      start_rule_hours: 20,
      start_rule_minutes: 0,
      end_rule_hours: 6,
      end_rule_minutes: 0,
      inherit_weather: false,
      raining: false,
      fog: false,
      enabled: true,
      segment: null,
      segment_id: null,
      device: null,
      device_id: null
    }

    return defaultRule;
  }

  onDefineStartCoord(): void {
    this.form_states = {default: false, start_coord: true, end_coord: false};
  }

  onDefineEndCoord(): void {
    this.form_states = {default: false, start_coord: false, end_coord: true};
  }

  onSegmentTypeChange(event, level){
    var parentId = event.target.value;

    this.segmentTypes.forEach((segmentTypeLevel, index) => {
      if(index > level){
        this.segmentTypes.splice(index, 1);
      }
    });

    this.segmentTypeLevel = level;

    this.segmentService.getSegmentTypes(parentId).subscribe(
      segmentTypes => {
        this.segmentTypes[level + 1] = segmentTypes
        this.segmentTypeLevel = level + 1;
      },
      error => this.errorMessage = <any>error
    );

  }

  onCancel(){
    this.location.back();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let x = event.keyCode;
    if (x === 27) {
        this.form_states = {default: true, start_coord: false, end_coord: false};
    }
  }

}
