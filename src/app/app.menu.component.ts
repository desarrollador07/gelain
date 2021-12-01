import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { MenuItem, ScrollPanel } from 'primeng/primeng';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, AfterViewInit {

    @Input() reset: boolean;

    model: any[];

    @ViewChild('layoutMenuScroller', { static: false }) layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent) { }

    ngOnInit() {
        this.model = [
            {   
                label: 'Inicio', 
                icon: 'fa fa-fw fa-home', 
                routerLink: ['dashboard']
            },
            { 
                label: 'Sistema', 
                icon: 'pi fa-fw pi-list',
                items:[
                    {   
                        label: 'Empresas', 
                        icon: 'fa fa-fw fa-building', 
                        routerLink: ['listarEmpresa']
                    },
                    {
                        label:'Empleados Pendientes',
                        icon:'fa fa-fw fa-user',
                        routerLink: ["empleados-pendientes"]  
                    },
                    {
                        label:'Usuarios',
                        icon:'fa fa-fw fa-user',
                        routerLink: ["usuarios"]  
                    },

                ] 
                
            },
            { 
                label: 'Valoración Psicologica', 
                icon: 'pi fa-fw pi-list',
                items:[
                    {
                        label: 'Empleados', 
                        icon: 'fa fa-fw fa-user',
                        routerLink: ['empleado'],
                    },
                    {
                        label: 'Reportes', 
                        icon: 'pi fa-fw pi-angle-right',
                        items:[
                            {
                                label: 'Informe Datos Generales', 
                                icon: 'pi pi-circle-on',
                                routerLink: ['BDRDG'],
                            },
                            {
                                label: 'Informe De Riesgos', 
                                icon: 'pi pi-circle-on',
                                routerLink: ['TD_DOMDIM'],
                            },
                            {
                                label: 'Informe De Riesgos Detallado Por Empleado', 
                                icon: 'pi pi-circle-on',
                                routerLink: ['ReporteDetallado'],
                            },
                            {
                                label: 'Informe Areas', 
                                icon: 'pi pi-circle-on',
                                routerLink: ['reporte-areas'],
                            },
                        ]
                    },
                ] 
                
            },
            {
                label: 'Valoración Física', 
                icon: 'pi fa-fw pi-list', 
                items:[
                    {
                        label: 'Valoración C.Física', 
                        icon: 'fa fa-fw fa-heartbeat', 
                        routerLink: ['ValorFisico'] 
                    },
                    {
                        label: 'Reportes', 
                        icon: 'pi fa-fw pi-angle-right',
                        items:[
                            {
                                label: 'Informe Valoración Física', 
                                icon: 'pi pi-circle-on',
                                routerLink: ['grafica-vf'],
                            },
                        ]
                    }
                    
                ],
            },
            {
                label: 'Valoración Riesgos', 
                icon: 'pi fa-fw pi-list', 
                items:[
                    {
                        label: 'Identificación de Peligros', 
                        icon: 'pi pi-exclamation-triangle', 
                        routerLink: ['valor-riesgo'] 
                    },
                    // {
                    //     label: 'Reportes', 
                    //     icon: 'pi fa-fw pi-angle-right',
                    //     items:[
                    //         {
                    //             label: 'Informe Valoración Peligros', 
                    //             icon: 'pi pi-circle-on',
                    //             routerLink: ['grafica-vf'],
                    //         },
                    //     ]
                    // }
                    
                ],
            },
           
            
 
        ];
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.layoutMenuScrollerViewChild.moveBar();
        }, 100);
    }

    changeTheme(theme: string, scheme: string) {
        const layoutLink: HTMLLinkElement = document.getElementById(
            "layout-css"
        ) as HTMLLinkElement;
        layoutLink.href = "assets/layout/css/layout-" + theme + ".css";

        const themeLink: HTMLLinkElement = document.getElementById(
            "theme-css"
        ) as HTMLLinkElement;
        themeLink.href = "assets/theme/" + theme + "/theme-" + scheme + ".css";
    }

    onMenuClick(event) {
        if (!this.app.isHorizontal()) {
            setTimeout(() => {
                this.layoutMenuScrollerViewChild.moveBar();
            }, 450);
        }

        this.app.onMenuClick(event);
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: "[app-submenu]",
    /* tslint:enable:component-selector */
    template: `
        <ng-template
            ngFor
            let-child
            let-i="index"
            [ngForOf]="root ? item : item.items"
        >
            <li
                [ngClass]="{ 'active-menuitem': isActive(i) }"
                [class]="child.badgeStyleClass"
                *ngIf="child.visible === false ? false : true"
            >
                <a
                    [href]="child.url || '#'"
                    (click)="itemClick($event, child, i)"
                    (mouseenter)="onMouseEnter(i)"
                    *ngIf="!child.routerLink"
                    [ngClass]="child.styleClass"
                    [attr.tabindex]="!visible ? '-1' : null"
                    [attr.target]="child.target"
                >
                    <i [ngClass]="child.icon"></i>
                    <span>{{ child.label }}</span>
                    <i
                        class="fa fa-fw fa-angle-down layout-menuitem-toggler"
                        *ngIf="child.items"
                    ></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{
                        child.badge
                    }}</span>
                </a>

                <a
                    (click)="itemClick($event, child, i)"
                    (mouseenter)="onMouseEnter(i)"
                    *ngIf="child.routerLink"
                    [routerLink]="child.routerLink"
                    routerLinkActive="active-menuitem-routerlink"
                    [fragment]="child.fragment"
                    [routerLinkActiveOptions]="{ exact: true }"
                    [attr.tabindex]="!visible ? '-1' : null"
                    [attr.target]="child.target"
                >
                    <i [ngClass]="child.icon"></i>
                    <span>{{ child.label }}</span>
                    <i
                        class="fa fa-fw fa-angle-down layout-menuitem-toggler"
                        *ngIf="child.items"
                    ></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{
                        child.badge
                    }}</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">
                        {{ child.label }}
                    </div>
                </div>
                <ul
                    app-submenu
                    [item]="child"
                    *ngIf="child.items"
                    [visible]="isActive(i)"
                    [reset]="reset"
                    [parentActive]="isActive(i)"
                    [@children]="
                        (app.isSlim() || app.isHorizontal()) && root
                            ? isActive(i)
                                ? 'visible'
                                : 'hidden'
                            : isActive(i)
                            ? 'visibleAnimated'
                            : 'hiddenAnimated'
                    "
                ></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger("children", [
            state(
                "hiddenAnimated",
                style({
                    height: "0px",
                })
            ),
            state(
                "visibleAnimated",
                style({
                    height: "*",
                })
            ),
            state(
                "visible",
                style({
                    height: "*",
                    "z-index": 100,
                })
            ),
            state(
                "hidden",
                style({
                    height: "0px",
                    "z-index": "*",
                })
            ),
            transition(
                "visibleAnimated => hiddenAnimated",
                animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
            ),
            transition(
                "hiddenAnimated => visibleAnimated",
                animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
            ),
        ]),
    ],
})

export class AppSubMenuComponent {
    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _parentActive: boolean;

    _reset: boolean;

    activeIndex: number;

    constructor(public app: AppComponent, public appMenu: AppMenuComponent) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = this.activeIndex === index ? null : index;

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.appMenu.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = false;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        
        if (
            this.root &&
            this.app.menuHoverActive &&
            (this.app.isHorizontal() || this.app.isSlim()) &&
            !this.app.isMobile() &&
            !this.app.isTablet()
        ) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && (this.app.isHorizontal() || this.app.isSlim())) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}

