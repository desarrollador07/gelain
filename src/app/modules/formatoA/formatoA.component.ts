import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
/*Modulos */
import { MessageService, MenuItem, SelectItem } from 'primeng/api';
/*Modelos */
import { FormatoA } from '../../models/formatoAmodel';
/*Servicios */
import { FormatoAService } from 'src/app/services/formato-a.service';
import { PruebaService } from '../../services/prueba.service';


@Component({
  selector: 'app-formatoA',
  templateUrl: './formatoA.component.html',
  styleUrls: ['./formatoA.component.css'],
})
export class FormatoAComponent implements OnInit {
  localPrueba: FormatoA = {};
  userform: FormGroup;
  es: any;
  idd: any;
  a1: SelectItem[];
  a11: SelectItem[];
  a2: SelectItem[];
  idl: any;
  items: MenuItem[];
  activeIndex: number = 1;
  vart = false;
  vart2 = false;
  formuA: FormatoA;
  datosEmpleado: any;
  cedula: any;
  nombre: any;
  validSave: boolean = false;


  constructor(private pruebaservices: PruebaService,
    private formatoAService: FormatoAService,
    private fb: FormBuilder,
    private router: Router,
    private _messageService: MessageService) {
    this.datosEmpleado = sessionStorage.getItem("IdEmpleado");
    this.idl = JSON.parse(sessionStorage.getItem('IdEmpleado'));

  }

  async ngOnInit() {

    this.pruebaservices.getEmpleadoId(this.datosEmpleado).subscribe((data: any) => {
      this.cedula = data[0].emdcedula;
      this.nombre = data[0].emdnombres + " " + data[0].emdapellidos;
    });
    this.getFormulario();
    await this.formatoAService.buscarByFa(this.idl).toPromise().then((data: any) => {
      this.localPrueba = data[0];
    });

    this.a1 = [];
    this.a1.push({ label: 'Seleccione...', value: '' });
    this.a1.push({ label: 'Siempre', value: '0' });
    this.a1.push({ label: 'Casi Siempre', value: '1' });
    this.a1.push({ label: 'Algunas Veces', value: '2' });
    this.a1.push({ label: 'Casi nunca', value: '3' });
    this.a1.push({ label: 'Nunca', value: '4' });

    this.a11 = [];
    this.a11.push({ label: 'Seleccione...', value: '0' });
    this.a11.push({ label: 'Siempre', value: '4' });
    this.a11.push({ label: 'Casi Siempre', value: '3' });
    this.a11.push({ label: 'Algunas Veces', value: '2' });
    this.a11.push({ label: 'Casi nunca', value: '1' });
    this.a11.push({ label: 'Nunca', value: '0' });

    this.a2 = [];
    this.a2.push({ label: 'Seleccione...', value: '' });
    this.a2.push({ label: 'Si', value: '1' });
    this.a2.push({ label: 'No', value: '2' });

    this.validacionDeEstados();
  };
  /*Apartado de validaciones */
  /*----------------------------- Seccion 1 ------------------------------- */
  get seccion1() {
    return this.userform.get('inaruido').invalid || this.userform.get('inafrio').invalid || this.userform.get('inacalor').invalid
      || this.userform.get('inaairefresco').invalid || this.userform.get('inaluz').invalid || this.userform.get('inacomodo').invalid
      || this.userform.get('inasustanquimicas').invalid || this.userform.get('inaesfuerzofisico').invalid || this.userform.get('inaequiposcomodos').invalid
      || this.userform.get('inaanimalesplantas').invalid || this.userform.get('inapreoaccidente').invalid || this.userform.get('inalugarlimpio').invalid;
  }
  get inaruidoMarca() {
    return this.userform.get('inaruido').invalid
  }
  get inaruido() {
    return this.userform.get('inaruido').invalid && this.userform.get('inaruido').touched
  }
  get inafrio() {
    return this.userform.get('inafrio').invalid && this.userform.get('inafrio').touched
  }
  get inafrioMarca() {
    return this.userform.get('inafrio').invalid
  }
  get inacalor() {
    return this.userform.get('inacalor').invalid && this.userform.get('inacalor').touched
  }
  get inacalorMarca() {
    return this.userform.get('inacalor').invalid
  }
  get inaairefresco() {
    return this.userform.get('inaairefresco').invalid && this.userform.get('inaairefresco').touched
  }
  get inaairefrescoMarca() {
    return this.userform.get('inaairefresco').invalid
  }
  get inaluz() {
    return this.userform.get('inaluz').invalid && this.userform.get('inaluz').touched
  }
  get inaluzMarca() {
    return this.userform.get('inaluz').invalid
  }
  get inacomodo() {
    return this.userform.get('inacomodo').invalid && this.userform.get('inacomodo').touched
  }
  get inacomodoMarca() {
    return this.userform.get('inacomodo').invalid
  }
  get inasustanquimicas() {
    return this.userform.get('inasustanquimicas').invalid && this.userform.get('inasustanquimicas').touched
  }
  get inasustanquimicasMarca() {
    return this.userform.get('inasustanquimicas').invalid
  }
  get inaesfuerzofisico() {
    return this.userform.get('inaesfuerzofisico').invalid && this.userform.get('inaesfuerzofisico').touched
  }
  get inaesfuerzofisicoMarca() {
    return this.userform.get('inaesfuerzofisico').invalid
  }
  get inaequiposcomodos() {
    return this.userform.get('inaequiposcomodos').invalid && this.userform.get('inaequiposcomodos').touched
  }
  get inaequiposcomodosMarca() {
    return this.userform.get('inaequiposcomodos').invalid
  }
  get inaanimalesplantas() {
    return this.userform.get('inaanimalesplantas').invalid && this.userform.get('inaanimalesplantas').touched
  }
  get inaanimalesplantasMarca() {
    return this.userform.get('inaanimalesplantas').invalid
  }
  get inapreoaccidente() {
    return this.userform.get('inapreoaccidente').invalid && this.userform.get('inapreoaccidente').touched
  }
  get inapreoaccidenteMarca() {
    return this.userform.get('inapreoaccidente').invalid
  }
  get inalugarlimpio() {
    return this.userform.get('inalugarlimpio').invalid && this.userform.get('inalugarlimpio').touched
  }
  get inalugarlimpioMarca() {
    return this.userform.get('inalugarlimpio').invalid
  }

  /*----------------------------- Seccion 2 ------------------------------- */
  get seccion2() {
    return this.userform.get('inaalcanzatiempo').invalid || this.userform.get('inatrabajasinparar').invalid;
  }
  get inatiempoadicional() {
    return this.userform.get('inatiempoadicional').invalid && this.userform.get('inatiempoadicional').touched
  }
  get inatiempoadicionalMarca() {
    return this.userform.get('inatiempoadicional').invalid
  }
  get inaalcanzatiempo() {
    return this.userform.get('inaalcanzatiempo').invalid && this.userform.get('inaalcanzatiempo').touched
  }
  get inaalcanzatiempoMarca() {
    return this.userform.get('inaalcanzatiempo').invalid
  }
  get inatrabajasinparar() {
    return this.userform.get('inatrabajasinparar').invalid && this.userform.get('inatrabajasinparar').touched
  }
  get inatrabajasinpararMarca() {
    return this.userform.get('inatrabajasinparar').invalid
  }

  /*----------------------------- Seccion 3 ------------------------------- */
  get seccion3() {
    return this.userform.get('inaesfuerzomental').invalid || this.userform.get('inaexigeconcentrado').invalid || this.userform.get('inaexigememoria').invalid
      || this.userform.get('inadesiciondificiles').invalid || this.userform.get('inaexigeasuntos').invalid || this.userform.get('inapqnosdetalles').invalid;
  }
  get inaesfuerzomentalMarca() {
    return this.userform.get('inaesfuerzomental').invalid
  }
  get inaesfuerzomental() {
    return this.userform.get('inaesfuerzomental').invalid && this.userform.get('inaesfuerzomental').touched
  }
  get inaexigeconcentradoMarca() {
    return this.userform.get('inaexigeconcentrado').invalid
  }
  get inaexigeconcentrado() {
    return this.userform.get('inaexigeconcentrado').invalid && this.userform.get('inaexigeconcentrado').touched
  }
  get inaexigememoriaMarca() {
    return this.userform.get('inaexigememoria').invalid
  }
  get inaexigememoria() {
    return this.userform.get('inaexigememoria').invalid && this.userform.get('inaexigememoria').touched
  }
  get inadesiciondificilesMarca() {
    return this.userform.get('inadesiciondificiles').invalid
  }
  get inadesiciondificiles() {
    return this.userform.get('inadesiciondificiles').invalid && this.userform.get('inadesiciondificiles').touched
  }
  get inaexigeasuntosMarca() {
    return this.userform.get('inaexigeasuntos').invalid
  }
  get inaexigeasuntos() {
    return this.userform.get('inaexigeasuntos').invalid && this.userform.get('inaexigeasuntos').touched
  }
  get inapqnosdetallesMarca() {
    return this.userform.get('inapqnosdetalles').invalid
  }
  get inapqnosdetalles() {
    return this.userform.get('inapqnosdetalles').invalid && this.userform.get('inapqnosdetalles').touched
  }

  /*----------------------------- Seccion 4 ------------------------------- */
  get seccion4() {
    return this.userform.get('inaresponcosasvalor').invalid || this.userform.get('inarespondinero').invalid || this.userform.get('inareponderotros').invalid
      || this.userform.get('inaresponarea').invalid || this.userform.get('inareponsalud').invalid || this.userform.get('inaordecontradic').invalid
      || this.userform.get('inahacerinnecesaria').invalid || this.userform.get('inapasarnormas').invalid || this.userform.get('inamaspracticas').invalid;
  }
  get inaresponcosasvalorMarca() {
    return this.userform.get('inaresponcosasvalor').invalid
  }
  get inaresponcosasvalor() {
    return this.userform.get('inaresponcosasvalor').invalid && this.userform.get('inaresponcosasvalor').touched
  }
  get inarespondineroMarca() {
    return this.userform.get('inarespondinero').invalid
  }
  get inarespondinero() {
    return this.userform.get('inarespondinero').invalid && this.userform.get('inarespondinero').touched
  }
  get inareponderotrosMarca() {
    return this.userform.get('inareponderotros').invalid
  }
  get inareponderotros() {
    return this.userform.get('inareponderotros').invalid && this.userform.get('inareponderotros').touched
  }
  get inaresponareaMarca() {
    return this.userform.get('inaresponarea').invalid
  }
  get inaresponarea() {
    return this.userform.get('inaresponarea').invalid && this.userform.get('inaresponarea').touched
  }
  get inareponsaludMarca() {
    return this.userform.get('inareponsalud').invalid
  }
  get inareponsalud() {
    return this.userform.get('inareponsalud').invalid && this.userform.get('inareponsalud').touched
  }
  get inaordecontradicMarca() {
    return this.userform.get('inaordecontradic').invalid
  }
  get inaordecontradic() {
    return this.userform.get('inaordecontradic').invalid && this.userform.get('inaordecontradic').touched
  }
  get inahacerinnecesariaMarca() {
    return this.userform.get('inahacerinnecesaria').invalid
  }
  get inahacerinnecesaria() {
    return this.userform.get('inahacerinnecesaria').invalid && this.userform.get('inahacerinnecesaria').touched
  }
  get inapasarnormasMarca() {
    return this.userform.get('inapasarnormas').invalid
  }
  get inapasarnormas() {
    return this.userform.get('inapasarnormas').invalid && this.userform.get('inapasarnormas').touched
  }
  get inamaspracticasMarca() {
    return this.userform.get('inamaspracticas').invalid
  }
  get inamaspracticas() {
    return this.userform.get('inamaspracticas').invalid && this.userform.get('inamaspracticas').touched
  }

  /*----------------------------- Seccion 5 ------------------------------- */
  get seccion5() {
    return this.userform.get('inatrabajodenoche').invalid || this.userform.get('inapausas').invalid || this.userform.get('inatrabajodiadesca').invalid
      || this.userform.get('inafinsemdesc').invalid || this.userform.get('inaencasapiensotra').invalid || this.userform.get('inadiscutofamilia').invalid
      || this.userform.get('inaasuntosencasa').invalid || this.userform.get('inapocotiempofami').invalid;
  }
  get inatrabajodenocheMarca() {
    return this.userform.get('inatrabajodenoche').invalid
  }
  get inatrabajodenoche() {
    return this.userform.get('inatrabajodenoche').invalid && this.userform.get('inatrabajodenoche').touched
  }
  get inapausasMarca() {
    return this.userform.get('inapausas').invalid
  }
  get inapausas() {
    return this.userform.get('inapausas').invalid && this.userform.get('inapausas').touched
  }
  get inatrabajodiadescaMarca() {
    return this.userform.get('inatrabajodiadesca').invalid
  }
  get inatrabajodiadesca() {
    return this.userform.get('inatrabajodiadesca').invalid && this.userform.get('inatrabajodiadesca').touched
  }
  get inafinsemdescMarca() {
    return this.userform.get('inafinsemdesc').invalid
  }
  get inafinsemdesc() {
    return this.userform.get('inafinsemdesc').invalid && this.userform.get('inafinsemdesc').touched
  }
  get inaencasapiensotraMarca() {
    return this.userform.get('inaencasapiensotra').invalid
  }
  get inaencasapiensotra() {
    return this.userform.get('inaencasapiensotra').invalid && this.userform.get('inaencasapiensotra').touched
  }
  get inadiscutofamiliaMarca() {
    return this.userform.get('inadiscutofamilia').invalid
  }
  get inadiscutofamilia() {
    return this.userform.get('inadiscutofamilia').invalid && this.userform.get('inadiscutofamilia').touched
  }
  get inaasuntosencasaMarca() {
    return this.userform.get('inaasuntosencasa').invalid
  }
  get inaasuntosencasa() {
    return this.userform.get('inaasuntosencasa').invalid && this.userform.get('inaasuntosencasa').touched
  }
  get inapocotiempofamiMarca() {
    return this.userform.get('inapocotiempofami').invalid
  }
  get inapocotiempofami() {
    return this.userform.get('inapocotiempofami').invalid && this.userform.get('inapocotiempofami').touched
  }

  /*----------------------------- Seccion 6 ------------------------------- */
  get seccion6() {
    return this.userform.get('inapermitehabilidad').invalid || this.userform.get('inapermiteconocimi').invalid || this.userform.get('inapermiteaprender').invalid
      || this.userform.get('inamiscapacidades').invalid || this.userform.get('inapausasnecesito').invalid || this.userform.get('inatrabajodiario').invalid
      || this.userform.get('inadecivelocidad').invalid || this.userform.get('inacambiarordenact').invalid || this.userform.get('inaatenderasunpers').invalid;
  }
  get inapermitehabilidadMarca() {
    return this.userform.get('inapermitehabilidad').invalid
  }
  get inapermitehabilidad() {
    return this.userform.get('inapermitehabilidad').invalid && this.userform.get('inapermitehabilidad').touched
  }
  get inapermiteconocimiMarca() {
    return this.userform.get('inapermiteconocimi').invalid
  }
  get inapermiteconocimi() {
    return this.userform.get('inapermiteconocimi').invalid && this.userform.get('inapermiteconocimi').touched
  }
  get inapermiteaprenderMarca() {
    return this.userform.get('inapermiteaprender').invalid
  }
  get inapermiteaprender() {
    return this.userform.get('inapermiteaprender').invalid && this.userform.get('inapermiteaprender').touched
  }
  get inamiscapacidadesMarca() {
    return this.userform.get('inamiscapacidades').invalid
  }
  get inamiscapacidades() {
    return this.userform.get('inamiscapacidades').invalid && this.userform.get('inamiscapacidades').touched
  }
  get inapausasnecesitoMarca() {
    return this.userform.get('inapausasnecesito').invalid
  }
  get inapausasnecesito() {
    return this.userform.get('inapausasnecesito').invalid && this.userform.get('inapausasnecesito').touched
  }
  get inatrabajodiarioMarca() {
    return this.userform.get('inatrabajodiario').invalid
  }
  get inatrabajodiario() {
    return this.userform.get('inatrabajodiario').invalid && this.userform.get('inatrabajodiario').touched
  }
  get inadecivelocidadMarca() {
    return this.userform.get('inadecivelocidad').invalid
  }
  get inadecivelocidad() {
    return this.userform.get('inadecivelocidad').invalid && this.userform.get('inadecivelocidad').touched
  }
  get inacambiarordenactMarca() {
    return this.userform.get('inacambiarordenact').invalid
  }
  get inacambiarordenact() {
    return this.userform.get('inacambiarordenact').invalid && this.userform.get('inacambiarordenact').touched
  }
  get inaatenderasunpersMarca() {
    return this.userform.get('inaatenderasunpers').invalid
  }
  get inaatenderasunpers() {
    return this.userform.get('inaatenderasunpers').invalid && this.userform.get('inaatenderasunpers').touched
  }

  /*----------------------------- Seccion 7 ------------------------------- */
  get seccion7() {
    return this.userform.get('inacambiosbeneficio').invalid || this.userform.get('inaexplicancambios').invalid || this.userform.get('inapuedodarsugeren').invalid
      || this.userform.get('inaencuentamisideas').invalid || this.userform.get('inacambiosdificultan').invalid;
  }
  get inacambiosbeneficioMarca() {
    return this.userform.get('inacambiosbeneficio').invalid
  }
  get inacambiosbeneficio() {
    return this.userform.get('inacambiosbeneficio').invalid && this.userform.get('inacambiosbeneficio').touched
  }
  get inaexplicancambiosMarca() {
    return this.userform.get('inaexplicancambios').invalid
  }
  get inaexplicancambios() {
    return this.userform.get('inaexplicancambios').invalid && this.userform.get('inaexplicancambios').touched
  }
  get inapuedodarsugerenMarca() {
    return this.userform.get('inapuedodarsugeren').invalid
  }
  get inapuedodarsugeren() {
    return this.userform.get('inapuedodarsugeren').invalid && this.userform.get('inapuedodarsugeren').touched
  }
  get inaencuentamisideasMarca() {
    return this.userform.get('inaencuentamisideas').invalid
  }
  get inaencuentamisideas() {
    return this.userform.get('inaencuentamisideas').invalid && this.userform.get('inaencuentamisideas').touched
  }
  get inacambiosdificultanMarca() {
    return this.userform.get('inacambiosdificultan').invalid
  }
  get inacambiosdificultan() {
    return this.userform.get('inacambiosdificultan').invalid && this.userform.get('inacambiosdificultan').touched
  }

  /*----------------------------- Seccion 8 ------------------------------- */
  get seccion8() {
    return this.userform.get('inaclaridadfunciones').invalid || this.userform.get('inadecisionesatomar').invalid || this.userform.get('inaresultadoslograr').invalid
      || this.userform.get('inaefectoenempresa').invalid || this.userform.get('inaexplicanobjetivos').invalid || this.userform.get('inaorientaciontraba').invalid
      || this.userform.get('inaresolverasuntos').invalid;
  }
  get inaclaridadfuncionesMarca() {
    return this.userform.get('inaclaridadfunciones').invalid
  }
  get inaclaridadfunciones() {
    return this.userform.get('inaclaridadfunciones').invalid && this.userform.get('inaclaridadfunciones').touched
  }
  get inadecisionesatomarMarca() {
    return this.userform.get('inadecisionesatomar').invalid
  }
  get inadecisionesatomar() {
    return this.userform.get('inadecisionesatomar').invalid && this.userform.get('inadecisionesatomar').touched
  }
  get inaresultadoslograrMarca() {
    return this.userform.get('inaresultadoslograr').invalid
  }
  get inaresultadoslograr() {
    return this.userform.get('inaresultadoslograr').invalid && this.userform.get('inaresultadoslograr').touched
  }
  get inaefectoenempresaMarca() {
    return this.userform.get('inaefectoenempresa').invalid
  }
  get inaefectoenempresa() {
    return this.userform.get('inaefectoenempresa').invalid && this.userform.get('inaefectoenempresa').touched
  }
  get inaexplicanobjetivosMarca() {
    return this.userform.get('inaexplicanobjetivos').invalid
  }
  get inaexplicanobjetivos() {
    return this.userform.get('inaexplicanobjetivos').invalid && this.userform.get('inaexplicanobjetivos').touched
  }
  get inaorientaciontrabaMarca() {
    return this.userform.get('inaorientaciontraba').invalid
  }
  get inaorientaciontraba() {
    return this.userform.get('inaorientaciontraba').invalid && this.userform.get('inaorientaciontraba').touched
  }
  get inaresolverasuntosMarca() {
    return this.userform.get('inaresolverasuntos').invalid
  }
  get inaresolverasuntos() {
    return this.userform.get('inaresolverasuntos').invalid && this.userform.get('inaresolverasuntos').touched
  }

  /*----------------------------- Seccion 9 ------------------------------- */
  get seccion9() {
    return this.userform.get('inaasiscapacitacion').invalid || this.userform.get('inarecibocapacitaci').invalid || this.userform.get('inarecibocapaciayuda').invalid;
  }
  get inaasiscapacitacionMarca() {
    return this.userform.get('inaasiscapacitacion').invalid
  }
  get inaasiscapacitacion() {
    return this.userform.get('inaasiscapacitacion').invalid && this.userform.get('inaasiscapacitacion').touched
  }
  get inarecibocapacitaciMarca() {
    return this.userform.get('inarecibocapacitaci').invalid
  }
  get inarecibocapacitaci() {
    return this.userform.get('inarecibocapacitaci').invalid && this.userform.get('inarecibocapacitaci').touched
  }
  get inarecibocapaciayudaMarca() {
    return this.userform.get('inarecibocapaciayuda').invalid
  }
  get inarecibocapaciayuda() {
    return this.userform.get('inarecibocapaciayuda').invalid && this.userform.get('inarecibocapaciayuda').touched
  }

  /*----------------------------- Seccion 10 ------------------------------- */
  get seccion10() {
    return this.userform.get('inajefeintrucciones').invalid || this.userform.get('inajefeayudaorganiz').invalid || this.userform.get('inajefemispuntosvist').invalid
      || this.userform.get('inajefeanima').invalid || this.userform.get('inajefedistribuye').invalid || this.userform.get('inajefecomunica').invalid
      || this.userform.get('inajefeorienracion').invalid || this.userform.get('inajefeayudaprogres').invalid || this.userform.get('inajefeayudasentime').invalid
      || this.userform.get('inajefesolucionar').invalid || this.userform.get('inajefeconfio').invalid || this.userform.get('inajefeescucha').invalid
      || this.userform.get('inajefeapoyo').invalid;
  }
  get inajefeintruccionesMarca() {
    return this.userform.get('inajefeintrucciones').invalid
  }
  get inajefeintrucciones() {
    return this.userform.get('inajefeintrucciones').invalid && this.userform.get('inajefeintrucciones').touched
  }
  get inajefeayudaorganizMarca() {
    return this.userform.get('inajefeayudaorganiz').invalid
  }
  get inajefeayudaorganiz() {
    return this.userform.get('inajefeayudaorganiz').invalid && this.userform.get('inajefeayudaorganiz').touched
  }
  get inajefemispuntosvistMarca() {
    return this.userform.get('inajefemispuntosvist').invalid
  }
  get inajefemispuntosvist() {
    return this.userform.get('inajefemispuntosvist').invalid && this.userform.get('inajefemispuntosvist').touched
  }
  get inajefeanimaMarca() {
    return this.userform.get('inajefeanima').invalid
  }
  get inajefeanima() {
    return this.userform.get('inajefeanima').invalid && this.userform.get('inajefeanima').touched
  }
  get inajefedistribuyeMarca() {
    return this.userform.get('inajefedistribuye').invalid
  }
  get inajefedistribuye() {
    return this.userform.get('inajefedistribuye').invalid && this.userform.get('inajefedistribuye').touched
  }
  get inajefecomunicaMarca() {
    return this.userform.get('inajefecomunica').invalid
  }
  get inajefecomunica() {
    return this.userform.get('inajefecomunica').invalid && this.userform.get('inajefecomunica').touched
  }
  get inajefeorienracionMarca() {
    return this.userform.get('inajefeorienracion').invalid
  }
  get inajefeorienracion() {
    return this.userform.get('inajefeorienracion').invalid && this.userform.get('inajefeorienracion').touched
  }
  get inajefeayudaprogresMarca() {
    return this.userform.get('inajefeayudaprogres').invalid
  }
  get inajefeayudaprogres() {
    return this.userform.get('inajefeayudaprogres').invalid && this.userform.get('inajefeayudaprogres').touched
  }
  get inajefeayudasentimeMarca() {
    return this.userform.get('inajefeayudasentime').invalid
  }
  get inajefeayudasentime() {
    return this.userform.get('inajefeayudasentime').invalid && this.userform.get('inajefeayudasentime').touched
  }
  get inajefesolucionarMarca() {
    return this.userform.get('inajefesolucionar').invalid
  }
  get inajefesolucionar() {
    return this.userform.get('inajefesolucionar').invalid && this.userform.get('inajefesolucionar').touched
  }
  get inajefeconfioMarca() {
    return this.userform.get('inajefeconfio').invalid
  }
  get inajefeconfio() {
    return this.userform.get('inajefeconfio').invalid && this.userform.get('inajefeconfio').touched
  }
  get inajefeescuchaMarca() {
    return this.userform.get('inajefeescucha').invalid
  }
  get inajefeescucha() {
    return this.userform.get('inajefeescucha').invalid && this.userform.get('inajefeescucha').touched
  }
  get inajefeapoyoMarca() {
    return this.userform.get('inajefeapoyo').invalid
  }
  get inajefeapoyo() {
    return this.userform.get('inajefeapoyo').invalid && this.userform.get('inajefeapoyo').touched
  }

  /*----------------------------- Seccion 11 ------------------------------- */
  get seccion11() {
    return this.userform.get('inaagradaambiente').invalid || this.userform.get('inagruporespeto').invalid || this.userform.get('inaconfiocompaneros').invalid
      || this.userform.get('inaagustocompaneros').invalid || this.userform.get('inagrupomaltrata').invalid || this.userform.get('inasolucionacompa').invalid
      || this.userform.get('inaintegraciongrp').invalid || this.userform.get('inagrupounido').invalid || this.userform.get('inasentirpartegrupo').invalid
      || this.userform.get('inatrabajogrupo').invalid || this.userform.get('inagrupodeacuerdo').invalid || this.userform.get('inagrupoayuda').invalid
      || this.userform.get('inaapoyounootros').invalid || this.userform.get('inaescuchanproble').invalid;
  }
  get inaagradaambienteMarca() {
    return this.userform.get('inaagradaambiente').invalid
  }
  get inaagradaambiente() {
    return this.userform.get('inaagradaambiente').invalid && this.userform.get('inaagradaambiente').touched
  }
  get inagruporespetoMarca() {
    return this.userform.get('inagruporespeto').invalid
  }
  get inagruporespeto() {
    return this.userform.get('inagruporespeto').invalid && this.userform.get('inagruporespeto').touched
  }
  get inaconfiocompanerosMarca() {
    return this.userform.get('inaconfiocompaneros').invalid
  }
  get inaconfiocompaneros() {
    return this.userform.get('inaconfiocompaneros').invalid && this.userform.get('inaconfiocompaneros').touched
  }
  get inaagustocompanerosMarca() {
    return this.userform.get('inaagustocompaneros').invalid
  }
  get inaagustocompaneros() {
    return this.userform.get('inaagustocompaneros').invalid && this.userform.get('inaagustocompaneros').touched
  }
  get inagrupomaltrataMarca() {
    return this.userform.get('inagrupomaltrata').invalid
  }
  get inagrupomaltrata() {
    return this.userform.get('inagrupomaltrata').invalid && this.userform.get('inagrupomaltrata').touched
  }
  get inasolucionacompaMarca() {
    return this.userform.get('inasolucionacompa').invalid
  }
  get inasolucionacompa() {
    return this.userform.get('inasolucionacompa').invalid && this.userform.get('inasolucionacompa').touched
  }
  get inaintegraciongrpMarca() {
    return this.userform.get('inaintegraciongrp').invalid
  }
  get inaintegraciongrp() {
    return this.userform.get('inaintegraciongrp').invalid && this.userform.get('inaintegraciongrp').touched
  }
  get inagrupounidoMarca() {
    return this.userform.get('inagrupounido').invalid
  }
  get inagrupounido() {
    return this.userform.get('inagrupounido').invalid && this.userform.get('inagrupounido').touched
  }
  get inasentirpartegrupoMarca() {
    return this.userform.get('inasentirpartegrupo').invalid
  }
  get inasentirpartegrupo() {
    return this.userform.get('inasentirpartegrupo').invalid && this.userform.get('inasentirpartegrupo').touched
  }
  get inatrabajogrupoMarca() {
    return this.userform.get('inatrabajogrupo').invalid
  }
  get inatrabajogrupo() {
    return this.userform.get('inatrabajogrupo').invalid && this.userform.get('inatrabajogrupo').touched
  }
  get inagrupodeacuerdoMarca() {
    return this.userform.get('inagrupodeacuerdo').invalid
  }
  get inagrupodeacuerdo() {
    return this.userform.get('inagrupodeacuerdo').invalid && this.userform.get('inagrupodeacuerdo').touched
  }
  get inagrupoayudaMarca() {
    return this.userform.get('inagrupoayuda').invalid
  }
  get inagrupoayuda() {
    return this.userform.get('inagrupoayuda').invalid && this.userform.get('inagrupoayuda').touched
  }
  get inaapoyounootrosMarca() {
    return this.userform.get('inaapoyounootros').invalid
  }
  get inaapoyounootros() {
    return this.userform.get('inaapoyounootros').invalid && this.userform.get('inaapoyounootros').touched
  }
  get inaescuchanprobleMarca() {
    return this.userform.get('inaescuchanproble').invalid
  }
  get inaescuchanproble() {
    return this.userform.get('inaescuchanproble').invalid && this.userform.get('inaescuchanproble').touched
  }

  /*----------------------------- Seccion 12 ------------------------------- */
  get seccion12() {
    return this.userform.get('inainfhagobien').invalid || this.userform.get('inainfmejorar').invalid || this.userform.get('inainfrendimiento').invalid
      || this.userform.get('inaevaluantrabajo').invalid || this.userform.get('inainfatiempomejora').invalid;
  }
  get inainfhagobienMarca() {
    return this.userform.get('inainfhagobien').invalid
  }
  get inainfhagobien() {
    return this.userform.get('inainfhagobien').invalid && this.userform.get('inainfhagobien').touched
  }
  get inainfmejorarMarca() {
    return this.userform.get('inainfmejorar').invalid
  }
  get inainfmejorar() {
    return this.userform.get('inainfmejorar').invalid && this.userform.get('inainfmejorar').touched
  }
  get inainfrendimientoMarca() {
    return this.userform.get('inainfrendimiento').invalid
  }
  get inainfrendimiento() {
    return this.userform.get('inainfrendimiento').invalid && this.userform.get('inainfrendimiento').touched
  }
  get inaevaluantrabajoMarca() {
    return this.userform.get('inaevaluantrabajo').invalid
  }
  get inaevaluantrabajo() {
    return this.userform.get('inaevaluantrabajo').invalid && this.userform.get('inaevaluantrabajo').touched
  }
  get inainfatiempomejoraMarca() {
    return this.userform.get('inainfatiempomejora').invalid
  }
  get inainfatiempomejora() {
    return this.userform.get('inainfatiempomejora').invalid && this.userform.get('inainfatiempomejora').touched
  }

  /*----------------------------- Seccion 13 ------------------------------- */
  get seccion13() {
    return this.userform.get('inaempconfiantrab').invalid || this.userform.get('inaemppaganatiempo').invalid || this.userform.get('inapagoofrecido').invalid
      || this.userform.get('inapagomerezco').invalid || this.userform.get('inaposibprogresar').invalid || this.userform.get('inahacerbienprog').invalid
      || this.userform.get('inaempbienestartrab').invalid || this.userform.get('inatrabajoestable').invalid || this.userform.get('inatrabsentirbien').invalid
      || this.userform.get('inasientoorgullo').invalid || this.userform.get('inahablobienempres').invalid;
  }
  get inaempconfiantrabMarca() {
    return this.userform.get('inaempconfiantrab').invalid
  }
  get inaempconfiantrab() {
    return this.userform.get('inaempconfiantrab').invalid && this.userform.get('inaempconfiantrab').touched
  }
  get inaemppaganatiempoMarca() {
    return this.userform.get('inaemppaganatiempo').invalid
  }
  get inaemppaganatiempo() {
    return this.userform.get('inaemppaganatiempo').invalid && this.userform.get('inaemppaganatiempo').touched
  }
  get inapagoofrecidoMarca() {
    return this.userform.get('inapagoofrecido').invalid
  }
  get inapagoofrecido() {
    return this.userform.get('inapagoofrecido').invalid && this.userform.get('inapagoofrecido').touched
  }
  get inapagomerezcoMarca() {
    return this.userform.get('inapagomerezco').invalid
  }
  get inapagomerezco() {
    return this.userform.get('inapagomerezco').invalid && this.userform.get('inapagomerezco').touched
  }
  get inaposibprogresarMarca() {
    return this.userform.get('inaposibprogresar').invalid
  }
  get inaposibprogresar() {
    return this.userform.get('inaposibprogresar').invalid && this.userform.get('inaposibprogresar').touched
  }
  get inahacerbienprogMarca() {
    return this.userform.get('inahacerbienprog').invalid
  }
  get inahacerbienprog() {
    return this.userform.get('inahacerbienprog').invalid && this.userform.get('inahacerbienprog').touched
  }
  get inaempbienestartrabMarca() {
    return this.userform.get('inaempbienestartrab').invalid
  }
  get inaempbienestartrab() {
    return this.userform.get('inaempbienestartrab').invalid && this.userform.get('inaempbienestartrab').touched
  }
  get inatrabajoestableMarca() {
    return this.userform.get('inatrabajoestable').invalid
  }
  get inatrabajoestable() {
    return this.userform.get('inatrabajoestable').invalid && this.userform.get('inatrabajoestable').touched
  }
  get inatrabsentirbienMarca() {
    return this.userform.get('inatrabsentirbien').invalid
  }
  get inatrabsentirbien() {
    return this.userform.get('inatrabsentirbien').invalid && this.userform.get('inatrabsentirbien').touched
  }
  get inasientoorgulloMarca() {
    return this.userform.get('inasientoorgullo').invalid
  }
  get inasientoorgullo() {
    return this.userform.get('inasientoorgullo').invalid && this.userform.get('inasientoorgullo').touched
  }
  get inahablobienempresMarca() {
    return this.userform.get('inahablobienempres').invalid
  }
  get inahablobienempres() {
    return this.userform.get('inahablobienempres').invalid && this.userform.get('inahablobienempres').touched
  }

  /* -------------------------------------- Sección 14 -------------------------- */
  get seccion14() {
    return this.userform.get('inaatencionausuarios').invalid;
  }

  get inaatencionausuariosMarca() {
    return this.userform.get('inaatencionausuarios').invalid
  }
  get inaatencionausuarios() {
    return this.userform.get('inaatencionausuarios').invalid && this.userform.get('inaatencionausuarios').touched
  }

  /* -------------------------------------- Sección 15 -------------------------- */
  get seccion15() {
    return this.userform.get('inasoyjefe').invalid;
  }

  get inasoyjefeMarca() {
    return this.userform.get('inasoyjefe').invalid
  }
  get inasoyjefe() {
    return this.userform.get('inasoyjefe').invalid && this.userform.get('inasoyjefe').touched
  }


  getFormulario() {
    this.userform = this.fb.group({
      inaid: [''],
      inaidempleado: [Number(this.idl)],
      inaruido: ['', Validators.required],
      inafrio: ['', Validators.required],
      inacalor: ['', Validators.required],
      inaairefresco: ['', Validators.required],
      inaluz: ['', Validators.required],
      inacomodo: ['', Validators.required],
      inasustanquimicas: ['', Validators.required],
      inaesfuerzofisico: ['', Validators.required],
      inaequiposcomodos: ['', Validators.required],
      inaanimalesplantas: ['', Validators.required],
      inapreoaccidente: ['', Validators.required],
      inalugarlimpio: ['', Validators.required],
      inatiempoadicional: ['', Validators.required],
      inaalcanzatiempo: ['', Validators.required],
      inatrabajasinparar: ['', Validators.required],
      inaesfuerzomental: ['', Validators.required],
      inaexigeconcentrado: ['', Validators.required],
      inaexigememoria: ['', Validators.required],
      inadesiciondificiles: ['', Validators.required],
      inaexigeasuntos: ['', Validators.required],
      inapqnosdetalles: ['', Validators.required],
      inaresponcosasvalor: ['', Validators.required],
      inarespondinero: ['', Validators.required],
      inareponderotros: ['', Validators.required],
      inaresponarea: ['', Validators.required],
      inareponsalud: ['', Validators.required],
      inaordecontradic: ['', Validators.required],
      inahacerinnecesaria: ['', Validators.required],
      inapasarnormas: ['', Validators.required],
      inamaspracticas: ['', Validators.required],
      inatrabajodenoche: ['', Validators.required],
      inapausas: ['', Validators.required],
      inatrabajodiadesca: ['', Validators.required],
      inafinsemdesc: ['', Validators.required],
      inaencasapiensotra: ['', Validators.required],
      inadiscutofamilia: ['', Validators.required],
      inaasuntosencasa: ['', Validators.required],
      inapocotiempofami: ['', Validators.required],
      inapermitehabilidad: ['', Validators.required],
      inapermiteconocimi: ['', Validators.required],
      inapermiteaprender: ['', Validators.required],
      inamiscapacidades: ['', Validators.required],
      inapausasnecesito: ['', Validators.required],
      inatrabajodiario: ['', Validators.required],
      inadecivelocidad: ['', Validators.required],
      inacambiarordenact: ['', Validators.required],
      inaatenderasunpers: ['', Validators.required],

      inacambiosbeneficio: ['', Validators.required],
      inaexplicancambios: ['', Validators.required],
      inapuedodarsugeren: ['', Validators.required],
      inaencuentamisideas: ['', Validators.required],
      inacambiosdificultan: ['', Validators.required],
      inaclaridadfunciones: ['', Validators.required],
      inadecisionesatomar: ['', Validators.required],
      inaresultadoslograr: ['', Validators.required],
      inaefectoenempresa: ['', Validators.required],
      inaexplicanobjetivos: ['', Validators.required],
      inaorientaciontraba: ['', Validators.required],
      inaresolverasuntos: ['', Validators.required],
      inaasiscapacitacion: ['', Validators.required],
      inarecibocapacitaci: ['', Validators.required],
      inarecibocapaciayuda: ['', Validators.required],
      inajefeintrucciones: ['', Validators.required],
      inajefeayudaorganiz: ['', Validators.required],
      inajefemispuntosvist: ['', Validators.required],
      inajefeanima: ['', Validators.required],
      inajefedistribuye: ['', Validators.required],
      inajefecomunica: ['', Validators.required],
      inajefeorienracion: ['', Validators.required],
      inajefeayudaprogres: ['', Validators.required],
      inajefeayudasentime: ['', Validators.required],
      inajefesolucionar: ['', Validators.required],
      inajefeconfio: ['', Validators.required],
      inajefeescucha: ['', Validators.required],
      inajefeapoyo: ['', Validators.required],
      inaagradaambiente: ['', Validators.required],
      inagruporespeto: ['', Validators.required],
      inaconfiocompaneros: ['', Validators.required],
      inaagustocompaneros: ['', Validators.required],
      inagrupomaltrata: ['', Validators.required],
      inasolucionacompa: ['', Validators.required],
      inaintegraciongrp: ['', Validators.required],
      inagrupounido: ['', Validators.required],
      inasentirpartegrupo: ['', Validators.required],
      inatrabajogrupo: ['', Validators.required],
      inagrupodeacuerdo: ['', Validators.required],
      inagrupoayuda: ['', Validators.required],
      inaapoyounootros: ['', Validators.required],
      inaescuchanproble: ['', Validators.required],
      inainfhagobien: ['', Validators.required],
      inainfmejorar: ['', Validators.required],
      inainfrendimiento: ['', Validators.required],
      inaevaluantrabajo: ['', Validators.required],
      inainfatiempomejora: ['', Validators.required],
      inaempconfiantrab: ['', Validators.required],
      inaemppaganatiempo: ['', Validators.required],
      inapagoofrecido: ['', Validators.required],
      inapagomerezco: ['', Validators.required],
      inaposibprogresar: ['', Validators.required],
      inahacerbienprog: ['', Validators.required],
      inaempbienestartrab: ['', Validators.required],
      inatrabajoestable: ['', Validators.required],
      inatrabsentirbien: ['', Validators.required],
      inasientoorgullo: ['', Validators.required],
      inahablobienempres: ['', Validators.required],

      inaatencionausuarios: ['', Validators.required],
      inausuenojados: ['0'],
      inausupreocupados: ['0'],
      inausutristes: ['0'],
      inausuenfermos: ['0'],
      inausuneceayuda: ['0'],
      inausumemaltratan: ['0'],
      inaususentimidistin: ['0'],
      inasituaviolencia: ['0'],
      inaexigedolorosas: ['0'],
      inasoyjefe: ['', Validators.required],
      inacomuntarde: ['0'],
      inairrespetuosos: ['0'],
      inadificorganiza: ['0'],
      inaguardansilencio: ['0'],
      inadificlogro: ['0'],
      inainforirrespet: ['0'],
      inapocacooperacio: ['0'],
      inapocodesempeno: ['0'],
      inacolabignoran: ['0']

    })
  }

  onSubmit() {
    if (this.userform.valid) {
      this.validSave = true;
      if (this.localPrueba !== null) {
        this.idd = this.localPrueba.inaid;
        this.formatoAService.updateFormatoA(this.userform.value, this.idd)
          .subscribe((data: any) => {
            this._messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Registro Actualizado', life: 3000 })
            this.userform.reset();
            setTimeout(() => {
              this.router.navigate(["/main/addExtralaboral/editar"]);
            }, 1000);
          });
      }

    } else {
      this._messageService.add({ severity: 'error', summary: 'fallido', detail: 'surgio un error', life: 3000 })
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);

    }
  }

  validar() {
    if (this.userform.value.inaatencionausuarios == 1) {
      this.vart = true;
    } else {
      this.vart = false;

    }

  }

  validar2() {
    if (this.userform.value.inasoyjefe == 1) {
      this.vart2 = true;
    } else {
      this.vart2 = false;
    }
  }

  validacionDeEstados() {
    if (this.localPrueba !== null) {
      if (this.localPrueba.inaatencionausuarios == "1") {

        this.vart = true;

      } else {
        this.vart = false;
      }

      if (this.localPrueba.inasoyjefe == "1") {
        this.vart2 = true;
      } else {
        this.vart2 = false;
      }

      this.userform.patchValue({
        inaidempleado: this.localPrueba.inaidempleado,
        inaruido: this.localPrueba.inaruido,
        inafrio: this.localPrueba.inafrio,
        inacalor: this.localPrueba.inacalor,
        inaairefresco: this.localPrueba.inaairefresco,
        inaluz: this.localPrueba.inaluz,
        inacomodo: this.localPrueba.inacomodo,
        inasustanquimicas: this.localPrueba.inasustanquimicas,
        inaesfuerzofisico: this.localPrueba.inaesfuerzofisico,
        inaequiposcomodos: this.localPrueba.inaequiposcomodos,
        inaanimalesplantas: this.localPrueba.inaanimalesplantas,
        inapreoaccidente: this.localPrueba.inapreoaccidente,
        inalugarlimpio: this.localPrueba.inalugarlimpio,
        inatiempoadicional: this.localPrueba.inatiempoadicional,
        inaalcanzatiempo: this.localPrueba.inaalcanzatiempo,
        inatrabajasinparar: this.localPrueba.inatrabajasinparar,
        inaesfuerzomental: this.localPrueba.inaesfuerzomental,
        inaexigeconcentrado: this.localPrueba.inaexigeconcentrado,
        inaexigememoria: this.localPrueba.inaexigememoria,
        inadesiciondificiles: this.localPrueba.inadesiciondificiles,
        inaexigeasuntos: this.localPrueba.inaexigeasuntos,
        inapqnosdetalles: this.localPrueba.inapqnosdetalles,
        inaresponcosasvalor: this.localPrueba.inaresponcosasvalor,
        inarespondinero: this.localPrueba.inarespondinero,
        inareponderotros: this.localPrueba.inareponderotros,
        inaresponarea: this.localPrueba.inaresponarea,
        inareponsalud: this.localPrueba.inareponsalud,
        inaordecontradic: this.localPrueba.inaordecontradic,
        inahacerinnecesaria: this.localPrueba.inahacerinnecesaria,
        inapasarnormas: this.localPrueba.inapasarnormas,
        inamaspracticas: this.localPrueba.inamaspracticas,
        inatrabajodenoche: this.localPrueba.inatrabajodenoche,
        inapausas: this.localPrueba.inapausas,
        inatrabajodiadesca: this.localPrueba.inatrabajodiadesca,
        inafinsemdesc: this.localPrueba.inafinsemdesc,
        inaencasapiensotra: this.localPrueba.inaencasapiensotra,
        inadiscutofamilia: this.localPrueba.inadiscutofamilia,
        inaasuntosencasa: this.localPrueba.inaasuntosencasa,
        inapocotiempofami: this.localPrueba.inapocotiempofami,
        inapermitehabilidad: this.localPrueba.inapermitehabilidad,
        inapermiteconocimi: this.localPrueba.inapermiteconocimi,
        inapermiteaprender: this.localPrueba.inapermiteaprender,
        inamiscapacidades: this.localPrueba.inamiscapacidades,
        inapausasnecesito: this.localPrueba.inapausasnecesito,
        inatrabajodiario: this.localPrueba.inatrabajodiario,
        inadecivelocidad: this.localPrueba.inadecivelocidad,
        inacambiarordenact: this.localPrueba.inacambiarordenact,
        inaatenderasunpers: this.localPrueba.inaatenderasunpers,
        inacambiosbeneficio: this.localPrueba.inacambiosbeneficio,
        inaexplicancambios: this.localPrueba.inaexplicancambios,
        inapuedodarsugeren: this.localPrueba.inapuedodarsugeren,
        inaencuentamisideas: this.localPrueba.inaencuentamisideas,
        inacambiosdificultan: this.localPrueba.inacambiosdificultan,
        inaclaridadfunciones: this.localPrueba.inaclaridadfunciones,
        inadecisionesatomar: this.localPrueba.inadecisionesatomar,
        inaresultadoslograr: this.localPrueba.inaresultadoslograr,
        inaefectoenempresa: this.localPrueba.inaefectoenempresa,
        inaexplicanobjetivos: this.localPrueba.inaexplicanobjetivos,
        inaorientaciontraba: this.localPrueba.inaorientaciontraba,
        inaresolverasuntos: this.localPrueba.inaresolverasuntos,
        inaasiscapacitacion: this.localPrueba.inaasiscapacitacion,
        inarecibocapacitaci: this.localPrueba.inarecibocapacitaci,
        inarecibocapaciayuda: this.localPrueba.inarecibocapaciayuda,
        inajefeintrucciones: this.localPrueba.inajefeintrucciones,
        inajefeayudaorganiz: this.localPrueba.inajefeayudaorganiz,
        inajefemispuntosvist: this.localPrueba.inajefemispuntosvist,
        inajefeanima: this.localPrueba.inajefeanima,
        inajefedistribuye: this.localPrueba.inajefedistribuye,
        inajefecomunica: this.localPrueba.inajefecomunica,
        inajefeorienracion: this.localPrueba.inajefeorienracion,
        inajefeayudaprogres: this.localPrueba.inajefeayudaprogres,
        inajefeayudasentime: this.localPrueba.inajefeayudasentime,
        inajefesolucionar: this.localPrueba.inajefesolucionar,
        inajefeconfio: this.localPrueba.inajefeconfio,
        inajefeescucha: this.localPrueba.inajefeescucha,
        inajefeapoyo: this.localPrueba.inajefeapoyo,
        inaagradaambiente: this.localPrueba.inaagradaambiente,
        inagruporespeto: this.localPrueba.inagruporespeto,
        inaconfiocompaneros: this.localPrueba.inaconfiocompaneros,
        inaagustocompaneros: this.localPrueba.inaagustocompaneros,
        inagrupomaltrata: this.localPrueba.inagrupomaltrata,
        inasolucionacompa: this.localPrueba.inasolucionacompa,
        inaintegraciongrp: this.localPrueba.inaintegraciongrp,
        inagrupounido: this.localPrueba.inagrupounido,
        inasentirpartegrupo: this.localPrueba.inasentirpartegrupo,
        inatrabajogrupo: this.localPrueba.inatrabajogrupo,
        inagrupodeacuerdo: this.localPrueba.inagrupodeacuerdo,
        inagrupoayuda: this.localPrueba.inagrupoayuda,
        inaapoyounootros: this.localPrueba.inaapoyounootros,
        inaescuchanproble: this.localPrueba.inaescuchanproble,
        inainfhagobien: this.localPrueba.inainfhagobien,
        inainfmejorar: this.localPrueba.inainfmejorar,
        inainfrendimiento: this.localPrueba.inainfrendimiento,
        inaevaluantrabajo: this.localPrueba.inaevaluantrabajo,
        inainfatiempomejora: this.localPrueba.inainfatiempomejora,
        inaempconfiantrab: this.localPrueba.inaempconfiantrab,
        inaemppaganatiempo: this.localPrueba.inaemppaganatiempo,
        inapagoofrecido: this.localPrueba.inapagoofrecido,
        inapagomerezco: this.localPrueba.inapagomerezco,
        inaposibprogresar: this.localPrueba.inaposibprogresar,
        inahacerbienprog: this.localPrueba.inahacerbienprog,
        inaempbienestartrab: this.localPrueba.inaempbienestartrab,
        inatrabajoestable: this.localPrueba.inatrabajoestable,
        inatrabsentirbien: this.localPrueba.inatrabsentirbien,
        inasientoorgullo: this.localPrueba.inasientoorgullo,
        inahablobienempres: this.localPrueba.inahablobienempres,
        inaatencionausuarios: this.localPrueba.inaatencionausuarios,
        inausuenojados: this.localPrueba.inausuenojados ? this.localPrueba.inausuenojados : "0",
        inausupreocupados: this.localPrueba.inausupreocupados ? this.localPrueba.inausupreocupados : "0",
        inausutristes: this.localPrueba.inausutristes ? this.localPrueba.inausutristes : "0",
        inausuenfermos: this.localPrueba.inausuenfermos ? this.localPrueba.inausuenfermos : "0",
        inausuneceayuda: this.localPrueba.inausuneceayuda ? this.localPrueba.inausuneceayuda : "0",
        inausumemaltratan: this.localPrueba.inausumemaltratan ? this.localPrueba.inausumemaltratan : "0",
        inaususentimidistin: this.localPrueba.inaususentimidistin ? this.localPrueba.inaususentimidistin : "0",
        inasituaviolencia: this.localPrueba.inasituaviolencia ? this.localPrueba.inasituaviolencia : "0",
        inaexigedolorosas: this.localPrueba.inaexigedolorosas ? this.localPrueba.inaexigedolorosas : "0",
        inasoyjefe: this.localPrueba.inasoyjefe,
        inacomuntarde: this.localPrueba.inacomuntarde ? this.localPrueba.inacomuntarde : "0",
        inairrespetuosos: this.localPrueba.inairrespetuosos ? this.localPrueba.inairrespetuosos : "0",
        inadificorganiza: this.localPrueba.inadificorganiza ? this.localPrueba.inadificorganiza : "0",
        inaguardansilencio: this.localPrueba.inaguardansilencio ? this.localPrueba.inaguardansilencio : "0",
        inadificlogro: this.localPrueba.inadificlogro ? this.localPrueba.inadificlogro : "0",
        inainforirrespet: this.localPrueba.inainforirrespet ? this.localPrueba.inainforirrespet : "0",
        inapocacooperacio: this.localPrueba.inapocacooperacio ? this.localPrueba.inapocacooperacio : "0",
        inapocodesempeno: this.localPrueba.inapocodesempeno ? this.localPrueba.inapocodesempeno : "0",
        inacolabignoran: this.localPrueba.inacolabignoran ? this.localPrueba.inacolabignoran : "0"
      })

    }
  }


}
