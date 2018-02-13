import { Component, OnInit, HostListener } from '@angular/core';

import { Segment } from '../../../models/segment';

import { SegmentService } from '../../../services/segment.service';


@Component({
  selector: 'app-segments-index',
  templateUrl: './segments-index.component.html',
  styleUrls: ['./segments-index.component.css'],
  providers: [SegmentService]
})
export class SegmentsIndexComponent implements OnInit {
  segments: Segment[] = [];
  segmentSelected: Segment = null;
  pageHeaderButton: {} = {
    icon: "fa fa-plus",
    label: "Afegir segment",
    route: "/segments/new"
  };

  errorMessage: string;


  constructor(private segmentService: SegmentService) { }

  ngOnInit() {
    this.getSegments();
  }

  getSegments(): void {
    this.segmentService.getSegments().subscribe(
      segments => this.segments = segments,
      error =>  this.errorMessage = <any>error
    );
  }

  onSegmentSelected(segment): void {
    this.segmentSelected = segment;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let x = event.keyCode;
    if (x === 27) {
        this.segmentSelected = null;
    }
  }

}
