import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { Device } from 'app/models/device';
import { Rule } from 'app/models/rule';

import * as _config from 'app/config/config';

@Injectable()
export class DeviceService {
  private endpoint: string = _config.api.url+'/devices';

  constructor(private http: Http) { }

  getDevices(): Observable<Device[]> {
    return this.http.get(this.endpoint)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getDevice(id: number): Observable<Device> {
    let url: string = this.endpoint+'/'+id;

    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getDeviceRules(device: Device): Observable<Rule[]> {
    let id = device.id;
    var url: string = this.endpoint + '/'+id+'/rules';
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createDevice(device: Device): Observable<Device> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.endpoint, { device }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteDevice(device: Device): Observable<any> {
    let id = device.id;
    let url: string = this.endpoint + '/'+id;
    return this.http.delete(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
