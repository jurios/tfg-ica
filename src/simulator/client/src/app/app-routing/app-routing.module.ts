import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from '../views/devices/index/index.component';
import { DeviceFormComponent } from '../views/devices/device-form/device-form.component';

import { SegmentsIndexComponent } from '../views/segments/segments-index/segments-index.component';
import { SegmentsFormComponent } from '../views/segments/segments-form/segments-form.component';
import { SegmentViewComponent } from '../views/segments/segment-view/segment-view.component';
import { RulesFormComponent } from '../views/rules/rules-form/rules-form.component';
import { DevicesViewComponent } from '../views/devices/devices-view/devices-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: 'devices',  component: IndexComponent },
  { path: 'devices/new',  component: DeviceFormComponent },
  { path: 'devices/:id',  component: DevicesViewComponent },
  { path: 'segments',  component: SegmentsIndexComponent },
  { path: 'segments/new',  component: SegmentsFormComponent },
  { path: 'segments/:id',  component: SegmentViewComponent },
  { path: 'segments/:segment_id/rules/new',  component: RulesFormComponent },
  { path: 'devices/:device_id/rules/new',  component: RulesFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
