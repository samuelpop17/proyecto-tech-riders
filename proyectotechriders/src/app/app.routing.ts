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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilusuarioComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'editar-usuario', component: EditarusuarioComponent },
  {
    path: 'editar-tecnologias-tech-rider',
    component: EditartecnologiastechriderComponent,
  },
  { path: 'modificar-contrasenya', component: ModificarcontrasenyaComponent },
  { path: 'registrar-usuario', component: RegisterusuarioComponent },
];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
