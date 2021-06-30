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

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {
        path: "login",
        component:LoginComponent
    },
    {
        
        path:"main",
        component:MainComponent,
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


            
        ]
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
