import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'pre_defensa_frontend';
  empleados: any[] = [];
  empleadoSeleccionado: string | null = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    const endpoint = 'http://localhost:5282/api/Empleado/search';

    this.httpClient.get<any>(endpoint).subscribe(
      response => {
        if (response.success) {
          this.empleados = response.data;
        } else {
          console.error('Error al cargar la lista de empleados.');
        }
      },
      error => {
        console.error('Error al realizar la solicitud HTTP:', error);
      }
    );
  }

  simular(tipo: string, empleadoId: string): void {
    const endpointMap: Record<string, string> = {
      'ausencia': 'http://localhost:5282/api/Empleado/ausencia',
      'sobrecarga': 'http://localhost:5282/api/Empleado/sobrecarga',
      'acceso': 'http://localhost:5282/api/Empleado/acceso'
    };
  
  
    const endpoint = endpointMap[tipo];
  
    if (endpoint) {
      const data = { empleadoId };
  
      this.httpClient.post<any>(endpoint, data).subscribe(
        response => {
          console.log(`Simulación de ${tipo} realizada para el empleado con ID ${empleadoId}`);
          // Puedes realizar acciones adicionales aquí si es necesario
        },
        error => {
          console.error(`Error al simular ${tipo}:`, error);
        }
      );
    } else {
      console.error(`Tipo de simulación desconocido: ${tipo}`);
    }
  }

  toggleDetails(empleado: string): void {
    this.empleadoSeleccionado = this.empleadoSeleccionado === empleado ? null : empleado;
  
  }
}
