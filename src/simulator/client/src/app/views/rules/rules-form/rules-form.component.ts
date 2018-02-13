import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Router }                 from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Segment } from 'app/models/segment';
import { Device } from 'app/models/device';
import { Rule } from 'app/models/rule';

import { SegmentService } from 'app/services/segment.service';
import { DeviceService } from 'app/services/device.service';
import { RuleService } from 'app/services/rule.service';

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.css'],
  providers: [SegmentService, DeviceService, RuleService]
})
export class RulesFormComponent implements OnInit {
  ruleForm: FormGroup;
  segment: Segment = null;
  device: Device = null;
  rule: Rule = null;

  errorMessage: string;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private segmentService: SegmentService,
    private deviceService: DeviceService,
    private ruleService: RuleService) {
      this.createForm();
    }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        if( typeof params.segment_id != 'undefined')
          return this.segmentService.getSegment(+params['segment_id'])
        else
          return [];
      })
      .subscribe(segment => {
        this.segment = segment;
      });

    this.route.params
      .switchMap((params: Params) => {
        if( typeof params.device_id != 'undefined')
          return this.deviceService.getDevice(+params['device_id'])
        else
          return [];
      })
      .subscribe(device => {
        this.device = device;
      });
  }

  createForm(){
    this.ruleForm = this.fb.group({
      'priority': [1, Validators.required],
      'preference': [false, Validators.required],
      'enabled': [true, Validators.required],
      'inherit_hibernate': [true, Validators.required],
      'allow_hibernate': [false, Validators.required],
      'total_hibernate': [false, Validators.required],
      'delay_hibernate': [600, Validators.required],
      'inherit_intensity': [true, Validators.required],
      'intensity_based_on': ['intensity', Validators.required],
      'intensity': [0, Validators.required],
      'intensity_value': ["absolute", Validators.required],
      'intensity_sign': ["+", Validators.required],
      'inherit_schedule':  [true, Validators.required],
      'start_rule_hours': [0, Validators.required],
      'start_rule_minutes': [0, Validators.required],
      'end_rule_hours': [0, Validators.required],
      'end_rule_minutes': [0, Validators.required],
      'inherit_weather': [true, Validators.required],
      'enabled_raining': [false, Validators.required],
      'raining': ["false", Validators.required],
      'enabled_fog': [false, Validators.required],
      'fog': ["false", Validators.required],
    });
  }

  onSubmit() {
    this.rule = this.prepareSaveRule();

    if(this.rule.id == null)
      this.ruleService.createRule(this.rule).subscribe(
        rule => {
          this.rule = rule;
          if(this.rule.segment_id != null)
            this.router.navigate(['/segments/'+this.rule.segment_id]);
          if(this.rule.device_id != null)
            this.router.navigate(['/devices/'+this.rule.device_id]);
        },
        error => this.errorMessage = <any>error
      );
  }

  onCancel() {
    this.location.back();
  }

  prepareSaveRule(): Rule {
    const formModel = this.ruleForm.value;

    const saveRule: Rule = {
      id: null,
      priority: formModel.priority as number,
      preference: formModel.preference as boolean,
      inherit_hibernate: formModel.inherit_hibernate as boolean,
      allow_hibernate: formModel.allow_hibernate as boolean,
      total_hibernate: formModel.total_hibernate as boolean,
      delay_hibernate: formModel.delay_hibernate as number,
      inherit_intensity: formModel.inherit_intensity as boolean,
      intensity: formModel.intensity as number,
      intensity_value: formModel.intensity_value as string,
      intensity_sign: formModel.intensity_sign as string,
      inherit_schedule: formModel.inherit_schedule as boolean,
      start_rule_hours: formModel.start_rule_hours as number,
      start_rule_minutes: formModel.start_rule_minutes as number,
      end_rule_hours: formModel.end_rule_hours as number,
      end_rule_minutes: formModel.end_rule_minutes as number,
      inherit_weather: formModel.inherit_weather,
      raining: null,
      fog: null,
      enabled: formModel.enabled as boolean,
      segment: null,
      segment_id: null,
      device: null,
      device_id: null
    }

    if(formModel.enabled_raining === true){
      if(formModel.raining === "true")
        saveRule.raining = true;
      if(formModel.raining === "false")
        saveRule.raining = false;
    }

    if(formModel.enabled_fog === true){
      if(formModel.fog === "true")
        saveRule.fog = true;
      if(formModel.fog === "false")
        saveRule.fog = false;
    }

    if (this.segment != null) {
      saveRule.segment_id = this.segment.id
    }
    if (this.device != null) {
      saveRule.device_id = this.device.id
    }

    return saveRule;
  }

}
