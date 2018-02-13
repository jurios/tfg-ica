import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Segment } from '../models/segment';
import { Rule } from '../models/rule';

import * as _config from 'app/config/config';

@Injectable()
export class SegmentService {

  private endpoint: string = _config.api.url+'/segments';

  constructor(private http: Http) { }

  getSegments(): Observable<Segment[]> {
    return this.http.get(this.endpoint)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getSegment(segmentId: number): Observable<Segment> {
    var url: string = this.endpoint+'/'+segmentId;
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getSegmentTypes(parent): Observable<{}[]> {
    var url: string = _config.api.url+'/segment_types/parent';
    if(parent != null)
      url = _config.api.url+'/segment_types/'+ parent +'/children';
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getSegmentRules(segment: Segment): Observable<Rule[]> {
    var segmentId = segment.id;
    var url: string = this.endpoint+'/'+segmentId+'/rules';
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createSegment(segment: Segment): Observable<Segment> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.endpoint, { segment }, options)
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
