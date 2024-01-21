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
import { SolicitarcharlaComponent } from './components/solicitarcharla/solicitarcharla.component';
import { EditarcharlaComponent } from './components/editarcharla/editarcharla.component';
import { CharlasTechRidersComponent } from './components/charlas-tech-riders/charlas-tech-riders.component';
import { ContactarAdminComponent } from './components/contactar-admin/contactar-admin.component';
import { ProponerTecnologiaComponent } from './components/proponer-tecnologia/proponer-tecnologia.component';
import { MischarrlasTechridersComponent } from './components/mischarrlas-techriders/mischarrlas-techriders.component';
import { ValoracioncharlaComponent } from './components/valoracioncharla/valoracioncharla.component';
import { MistechridersResponsableComponent } from './components/mistechriders-responsable/mistechriders-responsable.component';
import { CharlasMistechridersResponsableComponent } from './components/charlas-mistechriders-responsable/charlas-mistechriders-responsable.component';

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
    CharlasTechRidersComponent,
    ContactarAdminComponent,
    ProponerTecnologiaComponent,
    MischarrlasTechridersComponent,
    ValoracioncharlaComponent,
    MistechridersResponsableComponent,
    CharlasMistechridersResponsableComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
  ],
  providers: [
    appRoutingProvider,
    ServicePrincipal,
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
