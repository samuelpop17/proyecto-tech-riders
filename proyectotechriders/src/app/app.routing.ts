import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { LogoutComponent } from './components/logout/logout.component';
import { EditarusuarioComponent } from './components/editarusuario/editarusuario.component';
import { ModificarcontrasenyaComponent } from './components/modificarcontrasenya/modificarcontrasenya.component';
import { EditartecnologiastechriderComponent } from './components/editartecnologiastechrider/editartecnologiastechrider.component';
import { RegisterusuarioComponent } from './components/registerusuario/registerusuario.component';
import { EditarcursosComponent } from './components/editarcursos/editarcursos.component';
import { CharlasprofesorComponent } from './components/charlasprofesor/charlasprofesor.component';
import { DetallescharlaComponent } from './components/detallescharla/detallescharla.component';
import { SolicitarcharlaComponent } from './components/solicitarcharla/solicitarcharla.component';
import { EditarcharlaComponent } from './components/editarcharla/editarcharla.component';
import { ProponerTecnologiaComponent } from './components/proponer-tecnologia/proponer-tecnologia.component';
import { ContactarAdminComponent } from './components/contactar-admin/contactar-admin.component';
import { CharlasTechRidersComponent } from './components/charlas-tech-riders/charlas-tech-riders.component';
import { MischarrlasTechridersComponent } from './components/mischarrlas-techriders/mischarrlas-techriders.component';
import { ValoracioncharlaComponent } from './components/valoracioncharla/valoracioncharla.component';
import { MistechridersResponsableComponent } from './components/mistechriders-responsable/mistechriders-responsable.component';
import { CrearempresaResponsableComponent } from './components/crearempresa-responsable/crearempresa-responsable.component';
import { CalendarioTechRidersCharlasComponent } from './components/calendario-tech-riders-charlas/calendario-tech-riders-charlas.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuario/perfil', component: PerfilusuarioComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'editar-usuario', component: EditarusuarioComponent },
  {
    path: 'usuario/editar-tecnologias',
    component: EditartecnologiastechriderComponent,
  },
  {
    path: 'usuario/modificar-contrasenya',
    component: ModificarcontrasenyaComponent,
  },
  { path: 'registrar-usuario', component: RegisterusuarioComponent },

  { path: 'usuario/editar-cursos', component: EditarcursosComponent },
  { path: 'charlas/mis-charlas', component: CharlasprofesorComponent },
  { path: 'charlas/solicitar-charla', component: SolicitarcharlaComponent },
  { path: 'charlas/:idcharla', component: DetallescharlaComponent },
  { path: 'charlas/editar/:idcharla', component: EditarcharlaComponent },
  {
    path: 'charlas/valoracion/:idcharla',
    component: ValoracioncharlaComponent,
  },
  { path: 'proponertecno', component: ProponerTecnologiaComponent },
  { path: 'contactadmin', component: ContactarAdminComponent },
  { path: 'charlastechriders', component: CharlasTechRidersComponent },
  { path: 'mischarlastech', component: MischarrlasTechridersComponent },
  { path: 'mischarlastechridersresponsable', component: MistechridersResponsableComponent },
  { path: 'crearempresa', component: CrearempresaResponsableComponent },
  { path: 'calendariomitechrider', component: CalendarioTechRidersCharlasComponent },
];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
