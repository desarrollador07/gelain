import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from '../app/modules/login/login.component';
import { FormatoBModule } from './modules/formatoB/formatoB.module';
import { AuthGuard } from './guard/auth.guard';
import { TD_DOMDIMModule } from './modules/TD_DOMDIM/TD_DOMDIM.module';
import { FormEmpleadosLComponent } from './modules/FormularioEmpleado/formEmpleadosL.component';
import { FormatoALComponent } from './modules/formularioAL/formatoAL.component';
import { ExtralaboralLComponent } from './modules/extralaboralL/extralaboralL.component';
import { EstresLComponent } from './modules/estresL/estresL.component';
import { FinalFormularioComponent } from './modules/finalFormulario/finalFormulario.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {
        path: "login",
        component:LoginComponent
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


            
        ]
    },




];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',
relativeLinkResolution: 'legacy'});
