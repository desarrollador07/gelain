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

export const routes: Routes = [
    { path: "", redirectTo: "/main/listarPrueba", pathMatch: "full" },
    {
        path:"main",
        component:MainComponent,
        children:[
            {
                path: "listarPrueba",
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
            }
            
        ]
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
