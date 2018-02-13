import { Component, OnInit, Input, Output, OnChanges, AfterViewInit, SimpleChanges, EventEmitter } from '@angular/core';

import { Device } from '../../models/device';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() greenLights: {latitude: number, longitude: number}[] = [];
  @Input() disabledLights: {latitude: number, longitude: number}[] = [];
  @Input() offLights: {latitude: number, longitude: number}[] = [];
  @Input() onLights: {latitude: number, longitude: number}[] = [];

  @Input() mapPosition: {latitude: number, longitude: number} = {
    latitude: 39.3877689,
    longitude: -0.3755075
  };
  @Input() readOnly: boolean = true;
  @Input() uiMapTypeControl: boolean = false;
  @Output() clickMapEvent: EventEmitter<{
    latitude: number,
    longitude: number,
    address: string,
  }> = new EventEmitter<{
    latitude: number,
    longitude: number,
    address: string,
  }>();

  id: string = this.randomString(10);
  bounds: any = null;
  directionsService: any = null;
  directionsDisplay: any = null;
  map: any = null;
  geocoder: any = null;
  marker: any = null;
  formattedAddress: string = null;
  ui: {
    zoomControl: boolean,
    mapTypeControl: boolean,
    scaleControl: boolean,
    streetViewControl: boolean,
    rotateControl: boolean,
    fullscreenControl: boolean
  }

  isReady: boolean = false;


  constructor() { }

  ngOnInit() {
    this.ui = {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }
    if(this.uiMapTypeControl)
      this.ui.mapTypeControl = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.mapPosition)
      this.mapPosition = changes.mapPosition.currentValue;

    if(changes.greenLights)
      this.greenLights = changes.greenLights.currentValue;

    if(changes.disabledLights)
      this.disabledLights = changes.disabledLights.currentValue;

    if(changes.offLights)
      this.offLights = changes.offLights.currentValue;

    if(changes.onLight)
      this.onLights = changes.onLights.currentValue;

    if(this.isReady){
      this.renderMap();
    }
  }

  ngAfterViewInit() {
    this.isReady = true;
    this.renderMap();
  }

  initGoogleMaps(): void {
    this.geocoder = new google.maps.Geocoder;
    this.map = new google.maps.Map(document.getElementById(this.id), {
      //TODO: Check if no marks has been defined. If it is the case, then set a center and a zoom
      //center: new google.maps.LatLng(this.mapPosition.latitude, this.mapPosition.longitude),
      //zoom: 8,
      mapTypeId: 'roadmap',
      zoomControl: this.ui.zoomControl,
      mapTypeControl: this.ui.mapTypeControl,
      scaleControl: this.ui.scaleControl,
      streetViewControl: this.ui.streetViewControl,
      rotateControl: this.ui.rotateControl,
      fullscreenControl: this.ui.fullscreenControl,
    });

    if(this.readOnly == false){
      google.maps.event.addListener(this.map, 'click', (event) : void => {
        this.placeGoogleMapsMakrer(event.latLng);
      });
    }

    if( this.greenLights.length > 0 || this.disabledLights.length > 0 ||
      this.onLights.length > 0 || this.offLights.length > 0){

        this.bounds = new google.maps.LatLngBounds();

    }
  }

  placeGoogleMapsMakrer(location) {
    if(this.marker != null)
      this.marker.setMap(null);

    this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        icon: 'assets/img/llum_verda.png'
    });

    this.geocoder.geocode({'location': location}, (results, status) => {
      if (status === 'OK') {
          if (results[0]) {
              this.formattedAddress = results[0].formatted_address;
              this.clickMapEvent.emit({
                latitude: location.lat(),
                longitude: location.lng(),
                address: this.formattedAddress
              });
          }else {
            this.formattedAddress = "";
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
  }

  renderMap(): void {
    this.initGoogleMaps();
    var noMarks:boolean = true;

    if(this.greenLights.length > 0){
      noMarks = false;
      this.greenLights.forEach((mark) => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(mark.latitude, mark.longitude),
          map: this.map,
          icon: 'assets/img/llum_verda.png'
        });

        this.bounds.extend(marker.position);

      });
      this.map.fitBounds(this.bounds);
    }

    if(this.disabledLights.length > 0){
      noMarks = false;
      this.disabledLights.forEach((mark) => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(mark.latitude, mark.longitude),
          map: this.map,
          icon: 'assets/img/llum_desactivada.png'
        });

        this.bounds.extend(marker.position);

      });
      this.map.fitBounds(this.bounds);
    }

    if(this.offLights.length > 0){
      noMarks = false;
      this.offLights.forEach((mark) => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(mark.latitude, mark.longitude),
          map: this.map,
          icon: 'assets/img/llum_apagada.png'
        });

        this.bounds.extend(marker.position);

      });
      this.map.fitBounds(this.bounds);
    }

    if(this.onLights.length > 0){
      noMarks = false;
      this.onLights.forEach((mark) => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(mark.latitude, mark.longitude),
          map: this.map,
          icon: 'assets/img/llum_engegada.png'
        });

        this.bounds.extend(marker.position);

      });
      this.map.fitBounds(this.bounds);
    }

    if(noMarks) {
      this.map.setCenter(new google.maps.LatLng(this.mapPosition.latitude, this.mapPosition.longitude));
      this.map.setZoom(8);
    }

    //(optional) restore the zoom level after the map is done scaling
    var listener = google.maps.event.addListener(this.map, "idle", () => {
      /*if(this.map.getZoom() > 15 && this.isFirstRender === true)
        this.map.setZoom(15);*/
      google.maps.event.removeListener(listener);
    });
  }

  randomString(length: number): string {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }
}
