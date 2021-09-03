import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from '../app/modules/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { TerminosCondicionesComponent } from './modules/terminos-condiciones/terminos-condiciones.component';
import { ReporteAreasComponent } from './modules/reporte-areas/reporte-areas.component';
import { TerminosCondicionesVfComponent } from './modules/terminos-condiciones-vf/terminos-condiciones-vf.component';


export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {
        path: "login",
        component:LoginComponent
    },
    {
        path: "terminos-condiciones/:id",
        component:TerminosCondicionesComponent
    },
    {
        path: "consentimiento-vf/:id",
        component:TerminosCondicionesVfComponent
    },
    {
        path: "FormularioEmpleado",
        loadChildren: () =>
            import("./modules/FormularioEmpleado/formEmpleadoL.module").then(
                (m) => m.FormEmpleadosLModule
            ),
    }, 
    {
        path: "FormularioAL",
        loadChildren: () =>
            import("./modules/formularioAL/formatoAL.module").then(
                (m) => m.FormatoALModule
            ),
    },
    {
        path: "FormularioBL",
        loadChildren: () =>
            import("./modules/formularioBL/formatoBL.module").then(
                (m) => m.FormatoBLModule
            ),
    },  
    {
        path: "ExtralaboralL",
        loadChildren: () =>
            import("./modules/extralaboralL/extralaboralL.module").then(
                (m) => m.ExtralaboralModule
            ),
    }, 
    {
        path: "EstresL",
        loadChildren: () =>
            import("./modules/estresL/estresL.module").then(
                (m) => m.EstresLModule
            ),
    }, 
    {
        path: "FinalFormularios",
        loadChildren: () =>
            import("./modules/finalFormulario/finalFormulario.module").then(
                (m) => m.FinalFormulariosModule
            ),
    }, 

    {
        
        path:"main",
        component:MainComponent,
        canActivate: [AuthGuard],
        children:[
            {
                path: "empleados-pendientes",
                loadChildren: () =>
                import('./modules/empleados-pendientes/empleados-pendientes.module').then(
                    (m) => m.EmpleadosPendientesModule
                ),
            },
            {
                path: "usuarios",
                loadChildren: () =>
                import('./modules/usuarios/usuarios.module').then(
                    (m) => m.UsuariosModule
                ),
            },
            {
                path: "listarEmpresa",
                loadChildren: () =>
                import('./modules/prueba/prueba.module').then(
                    (m) => m.PruebaModule
                ),
            },
            {
                path: "prueba",
                loadChildren: () =>
                import('./modules/form-prueba/form-prueba.module').then(
                    (m) => m.FormPruebaModule
                ),
            },
            {
                path: "dashboard",
                loadChildren: () =>
                    import("./modules/dashboard/dashboard.module").then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: "empleado",
                loadChildren: () =>
                    import("./modules/empleados/empleados.module").then(
                        (m) => m.EmpleadosModule
                    ),
            },
            {
                path: "addempleado",
                loadChildren: () =>
                    import("./modules/form-empleados/form-empleado.module").then(
                        (m) => m.FormEmpleadosModule
                    ),
            },
            {
                path: "area",
                loadChildren: () =>
                    import("./modules/area/area.module").then(
                        (m) => m.AreaModule
                    ),
            },
             {
                path: "addArea",
                loadChildren: () =>
                    import("./modules/form-area/form-area.module").then(
                        (m) => m.FormAreaModule
                    ),
            }, 
            {
                path: "addFormatoA",
                loadChildren: () =>
                    import("./modules/formatoA/formatoA.module").then(
                        (m) => m.FormatoAModule
                    ),
            }, 
            {
                path: "addEstres",
                loadChildren: () =>
                    import("./modules/estres/estres.module").then(
                        (m) => m.EstresModule
                    ),
            }, 
            {
                path: "addExtralaboral",
                loadChildren: () =>
                    import("./modules/extralaboral/extralaboral.module").then(
                        (m) => m.ExtralaboralModule
                    ),
            },
            {
                path: "addFormatoB",
                loadChildren: () =>
                    import("./modules/formatoB/formatoB.module").then(
                        (m) => m.FormatoBModule
                    ),
            },  
            {
                path: "Reportes",
                loadChildren: () =>
                    import("./modules/reportes/reportes.module").then(
                        (m) => m.ReportesModule
                    ),
            },
            {
                path: "reporte-areas",
                component:ReporteAreasComponent
            },
            {
                path: "BDRDG",
                loadChildren: () =>
                    import("./modules/BDRDG/BDRDG.module").then(
                        (m) => m.BDRDGModule
                    ),
            },

            {
                path: "TD_DOMDIM",
                loadChildren: () =>
                    import("./modules/TD_DOMDIM/TD_DOMDIM.module").then(
                        (m) => m.TD_DOMDIMModule
                    ),
            },

            {
                path: "ReporteDetallado",
                loadChildren: () =>
                    import("./modules/reporDetallado/ReporteDetallado.module").then(
                        (m) => m.ReporteDetalladoModule
                    ),
            },
            {
                path: "ValorFisico",
                loadChildren: () =>
                    import("./modules/valorFisico/valorFisico.module").then(
                        (m) => m.ValorFisicoModule
                    ),
            },
            {
                path: "FormValorFisico",
                loadChildren: () =>
                    import("./modules/Form-valorFisico/formValorFisico.module").then(
                        (m) => m.FormValorFisicoModule
                    ),
            },


            
        ]
    },




];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',
relativeLinkResolution: 'legacy'});
