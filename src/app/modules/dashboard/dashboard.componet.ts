import { Component, OnInit } from "@angular/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
/*Modulos */
import { SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/primeng';
/*Modelos */
import { Car } from '../../demo/domain/car';
/*Servicios */
import { CarService } from '../../demo/service/carservice';
import { EventService } from '../../demo/service/eventservice';
import { BreadcrumbService } from '../../breadcrumb.service';
import { ValidacionService } from "src/app/services/validacion.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
    images: any[];
    cities: SelectItem[];
    cars: Car[];
    cols: any[];
    chartData: any;
    events: any[];
    selectedCity: any;
    selectedCar: Car;
    items: MenuItem[];
    fullcalendarOptions: any;
    
    constructor(private carService: CarService, private eventService: EventService, private breadcrumbService: BreadcrumbService,private  validacionService: ValidacionService) {
        this.validacionService.recargarPagina();
        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: [''] }
        ]);
    }
    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.eventService.getEvents().then(events => { this.events = events; });

        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#FFC107'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#03A9F4'
                }
            ]
        };

        this.items = [
            { label: 'Save', icon: 'fa fa-fw fa-check' },
            { label: 'Update', icon: 'fa fa-fw fa-refresh' },
            { label: 'Delete', icon: 'fa fa-fw fa-trash' }
        ];

        this.fullcalendarOptions = {
            plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
            defaultDate: '2016-01-12',
            header: {
                right: 'prev,next, today',
                left: 'title'
            }
        };

        this.images = [];
        this.images.push({source:'../../../assets/layout/images/foto3.jpg', alt:'es un placer tenerte de visita', title:'Bienvenidos',width: "500px",height:"400px"});
        this.images.push({source:'../../../assets/layout/images/foto4.JPG', alt:'Description for Image 2', title:'Hola '});
    }
}
