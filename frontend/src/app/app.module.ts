import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Angular 17-19: AppComponent desde './app.component'.
// Angular 20+: cambia a  import { App } from './app';  y usa App en declarations y bootstrap.
import { AppComponent } from './app.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';

@NgModule({
  declarations: [AppComponent, EmpleadosComponent], // componentes de este módulo
  imports: [BrowserModule, FormsModule],            // módulos que necesitamos
  providers: [provideHttpClient(withInterceptorsFromDi())], // habilita HttpClient
  bootstrap: [AppComponent]                          // componente que arranca la app
})
export class AppModule {}
