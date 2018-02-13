import {
  Component,
  OnInit,
  NgZone,
  OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';

import { Device } from '../../../models/device';
import { Segment } from '../../../models/segment';

import { DeviceService } from '../../../services/device.service';
import { SegmentService } from '../../../services/segment.service';


@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css'],
  providers: [DeviceService, SegmentService]
})
export class DeviceFormComponent implements OnInit {
  deviceForm: FormGroup;
  device: Device;
  segments: Segment[];
  backgroundMarks: {latitude: number, longitude: number}[] = [];

  errorMessage: string;

  marker = null;
  map: {};
  geocoder = null;
  formattedAddress: string = "";

  constructor(  private location: Location,
                private fb: FormBuilder,
                private ngZone: NgZone,
                private deviceService: DeviceService,
                private segmentService: SegmentService,
                private router: Router
              ){
    this.createForm();
  }

  ngOnInit() {
    this.segmentService.getSegments().subscribe(
      segments => this.segments = segments,
      error => this.errorMessage = <any>error
    );
  }

  createForm(){
    this.deviceForm = this.fb.group({
      'longitude': ['', Validators.required],
      'latitude': ['', Validators.required],
      'address': [''],
      'serial_id': [this.randomString(10), Validators.required],
      'segment_id': ['']
    });
  }

  randomString(length: number): string {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  onMapClicked(object: {longitude: number, latitude: number, address: string}): void {
    this.deviceForm.patchValue({
      'longitude': object.longitude,
      'latitude': object.latitude,
      'address': object.address
    })

    this.ngZone.run(() => {
      this.formattedAddress = object.address;
    });
  }

  onSegmentChanged():void {
    var segment_id = this.deviceForm.value.segment_id;
    this.backgroundMarks = [];
    this.segments.forEach((segment) => {
      if(segment.id == segment_id){
        segment.devices.forEach((device) =>{
          this.backgroundMarks.push({longitude: device.longitude, latitude: device.latitude});
        })
      }
    });

    console.log(this.backgroundMarks);
  }

  onSubmit(){
    this.device = this.prepareSaveDevice();

    if(this.device.id == null)
      this.deviceService.createDevice(this.device).subscribe(
        device => {
          this.device = device;
          this.router.navigate(['/devices']);
        },
        error => this.errorMessage = <any>error
      );
  }

  prepareSaveDevice(): Device {
    const formModel = this.deviceForm.value;

    const saveDevice: Device = {
      id: null,
      latitude: formModel.latitude as number,
      longitude: formModel.longitude as number,
      serial_id: formModel.serial_id as string,
      address: this.formattedAddress as string,
      segment_id: formModel.segment_id as number
    };

    return saveDevice;
  }

  onCancel(){
    this.location.back();
  }

}
