import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { appRoutingProvider, routing } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ServicePrincipal } from './services/service.principal';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { MenuprivadoComponent } from './components/menuprivado/menuprivado.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, PerfilusuarioComponent, MenuprivadoComponent, LogoutComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, routing],
  providers: [appRoutingProvider, ServicePrincipal],
  bootstrap: [AppComponent],
})
export class AppModule {}
