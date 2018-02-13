import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { HeaderComponent } from './views/header/header.component';
import { LeftMenuComponent } from './views/left-menu/left-menu.component';
import { CollapseMenuItemComponent } from './views/left-menu/collapse-menu-item/collapse-menu-item.component';
import { IndexComponent } from './views/devices/index/index.component';
import { PageHeaderComponent } from './views/page-header/page-header.component';
import { DeviceDetailComponent } from './views/devices/index/device-detail/device-detail.component';
import { DeviceFormComponent } from './views/devices/device-form/device-form.component';
import { SegmentsIndexComponent } from './views/segments/segments-index/segments-index.component';
import { SegmentsFormComponent } from './views/segments/segments-form/segments-form.component';
import { SegmentsDetailComponent } from './views/segments/segments-index/segments-detail/segments-detail.component';
import { MapComponent } from './components/map/map.component';
import { SegmentViewComponent } from './views/segments/segment-view/segment-view.component';
import { DevicesTableComponent } from './views/devices/index/devices-table/devices-table.component';
import { RulesTableComponent } from './views/rules/rules-table/rules-table.component';
import { RulesFormComponent } from './views/rules/rules-form/rules-form.component';
import { SegmentSimulatorComponent } from './views/segments/segment-view/segment-simulator/segment-simulator.component';
import { DevicesViewComponent } from './views/devices/devices-view/devices-view.component';
import { DeviceSimulatorComponent } from './views/devices/devices-view/device-simulator/device-simulator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftMenuComponent,
    CollapseMenuItemComponent,
    IndexComponent,
    PageHeaderComponent,
    DeviceDetailComponent,
    DeviceFormComponent,
    SegmentsIndexComponent,
    SegmentsFormComponent,
    SegmentsDetailComponent,
    MapComponent,
    SegmentViewComponent,
    DevicesTableComponent,
    RulesTableComponent,
    RulesFormComponent,
    SegmentSimulatorComponent,
    DevicesViewComponent,
    DeviceSimulatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
