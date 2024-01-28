import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es');

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { appRoutingProvider, routing } from './app.routing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AcreditarcharlaComponent } from './components/acreditarcharla/acreditarcharla.component';
import { AltaempresaComponent } from './components/altaempresa/altaempresa.component';
import { AltausuarioComponent } from './components/altausuario/altausuario.component';
import { AniadirtecnologiaComponent } from './components/aniadirtecnologia/aniadirtecnologia.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CalendarioTechRidersCharlasComponent } from './components/calendario-tech-riders-charlas/calendario-tech-riders-charlas.component';
import { CharlasTechRidersComponent } from './components/charlas-tech-riders/charlas-tech-riders.component';
import { CharlasprofesorComponent } from './components/charlasprofesor/charlasprofesor.component';
import { ContactarAdminComponent } from './components/contactar-admin/contactar-admin.component';
import { CrearempresaResponsableComponent } from './components/crearempresa-responsable/crearempresa-responsable.component';
import { DetallescharlaComponent } from './components/detallescharla/detallescharla.component';
import { EditarcharlaComponent } from './components/editarcharla/editarcharla.component';
import { EditarcursosComponent } from './components/editarcursos/editarcursos.component';
import { EditartecnologiastechriderComponent } from './components/editartecnologiastechrider/editartecnologiastechrider.component';
import { EditarusuarioComponent } from './components/editarusuario/editarusuario.component';
import { HomeComponent } from './components/home/home.component';
import { ListadocentrosComponent } from './components/listadocentros/listadocentros.component';
import { ListadosComponent } from './components/listados/listados.component';
import { ListadosempresaComponent } from './components/listadosempresa/listadosempresa.component';
import { ListadotrComponent } from './components/listadotr/listadotr.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuComponent } from './components/menu/menu.component';
import { MischarrlasTechridersComponent } from './components/mischarrlas-techriders/mischarrlas-techriders.component';
import { MistechridersResponsableComponent } from './components/mistechriders-responsable/mistechriders-responsable.component';
import { ModificarcontrasenyaComponent } from './components/modificarcontrasenya/modificarcontrasenya.component';
import { PanelPeticionesAdminComponent } from './components/panel-peticiones-admin/panel-peticiones-admin.component';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { ProponerTecnologiaComponent } from './components/proponer-tecnologia/proponer-tecnologia.component';
import { RegisterusuarioComponent } from './components/registerusuario/registerusuario.component';
import { ServicePrincipal } from './services/service.principal';
import { SolicitarcharlaComponent } from './components/solicitarcharla/solicitarcharla.component';
import { ValoracioncharlaComponent } from './components/valoracioncharla/valoracioncharla.component';
import { DetallesTechRiderComponent } from './components/detalles-tech-rider/detalles-tech-rider.component';
import { CursosCentroComponent } from './components/cursos-centro/cursos-centro.component';

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
    CalendarioComponent,
    ListadosComponent,
    CharlasTechRidersComponent,
    ContactarAdminComponent,
    ProponerTecnologiaComponent,
    MischarrlasTechridersComponent,
    ValoracioncharlaComponent,
    MistechridersResponsableComponent,
    CrearempresaResponsableComponent,
    CalendarioTechRidersCharlasComponent,
    ListadotrComponent,
    ListadocentrosComponent,
    ListadosempresaComponent,
    PanelPeticionesAdminComponent,
    AltausuarioComponent,
    AcreditarcharlaComponent,
    AniadirtecnologiaComponent,
    AltaempresaComponent,
    DetallesTechRiderComponent,
    CursosCentroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    CommonModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],

  providers: [
    appRoutingProvider,
    ServicePrincipal,
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
