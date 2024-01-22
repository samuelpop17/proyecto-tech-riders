import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { appRoutingProvider, routing } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ServicePrincipal } from './services/service.principal';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuComponent } from './components/menu/menu.component';
import { EditarusuarioComponent } from './components/editarusuario/editarusuario.component';
import { ModificarcontrasenyaComponent } from './components/modificarcontrasenya/modificarcontrasenya.component';
import { EditartecnologiastechriderComponent } from './components/editartecnologiastechrider/editartecnologiastechrider.component';
import { RegisterusuarioComponent } from './components/registerusuario/registerusuario.component';
import { EditarcursosComponent } from './components/editarcursos/editarcursos.component';
import { CharlasprofesorComponent } from './components/charlasprofesor/charlasprofesor.component';
import { DetallescharlaComponent } from './components/detallescharla/detallescharla.component';

import localeEs from '@angular/common/locales/es';
import { CommonModule, registerLocaleData } from '@angular/common';
import { SolicitarcharlaComponent } from './components/solicitarcharla/solicitarcharla.component';
import { EditarcharlaComponent } from './components/editarcharla/editarcharla.component';
import { CharlasComponent } from './components/charlas/charlas.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { FlatpickrModule } from 'angularx-flatpickr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ListadosComponent } from './components/listados/listados.component'

import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PerfilusuarioComponent,
    LogoutComponent,
    MenuComponent,
    EditarusuarioComponent,
    ModificarcontrasenyaComponent,
    EditartecnologiastechriderComponent,
    RegisterusuarioComponent,
    EditarcursosComponent,
    CharlasprofesorComponent,
    DetallescharlaComponent,
    SolicitarcharlaComponent,
    EditarcharlaComponent,
    CharlasComponent,
    CalendarioComponent,
    ListadosComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, routing,  CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
  
  ],
    
  providers: [
    appRoutingProvider,
    ServicePrincipal,
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
