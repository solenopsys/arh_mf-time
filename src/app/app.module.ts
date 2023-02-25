import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {BootstrapComponent, FuiTemplatesModule, TABLE_PAGE} from "@solenopsys/uimatrix-templates";
import {TimeStatComponent} from "./time-stat/time-stat.component";
import {TIMES} from "./tables.conf";
import {HttpClientModule} from "@angular/common/http";
import {NgxEchartsModule} from "ngx-echarts";
import {FormsModule} from "@angular/forms";
import {createNgxs} from "@solenopsys/lib-storage";
import {ClusterState} from "@solenopsys/lib-clusters";
import {environment} from "../environments/environment";

const ROUTES: Routes = [
  {path: '', redirectTo: 'stat',pathMatch:'full'},
  {path: 'stat', component: TimeStatComponent},
  TABLE_PAGE(':table'),
];

export const TABLES_CONFS = {
  time: TIMES
};

export const IMPORTS_CONF = [
  BrowserModule,

  NgxEchartsModule,
  NgxEchartsModule.forRoot({
    echarts: () => import('echarts'),
  }),
  HttpClientModule,
  FormsModule,
  FuiTemplatesModule,

  ...createNgxs(!environment.production,[]),

  RouterModule.forChild([...ROUTES]),

]

export const PROVIDERS_CONF = [
  {provide: 'tables', useValue: TABLES_CONFS},
  {provide: 'assets_dir', useValue: "/fm/modules/richteri/time"},
  {provide: 'mod_name', useValue: "time"}
]

@NgModule({
  declarations: [TimeStatComponent],
  imports: [
    ...IMPORTS_CONF
  ],
  providers: [...PROVIDERS_CONF],
  bootstrap: [BootstrapComponent],
})
export class AppModule {
}
