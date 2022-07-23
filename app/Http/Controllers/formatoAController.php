<?php

namespace App\Http\Controllers;
use App\Models\formatoA;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
class formatoAController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return formatoA::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return formatoA::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $inaid)
    {
        $cl = formatoA::findOrfail($inaid);
        $cl -> inaidempleado= $request ->inaidempleado;
        $cl -> inaruido= $request ->inaruido;
        $cl -> inafrio= $request ->inafrio;
        $cl -> inacalor= $request ->inacalor;
        $cl -> inaairefresco= $request ->inaairefresco;
        $cl -> inaluz= $request ->inaluz;
        $cl -> inacomodo= $request ->inacomodo;
        $cl -> inasustanquimicas= $request ->inasustanquimicas;
        $cl -> inaesfuerzofisico= $request ->inaesfuerzofisico;
        $cl -> inaequiposcomodos= $request ->inaequiposcomodos;
        $cl -> inaanimalesplantas= $request ->inaanimalesplantas;
        $cl -> inapreoaccidente= $request ->inapreoaccidente;
        $cl -> inalugarlimpio= $request ->inalugarlimpio;
        $cl -> inatiempoadicional= $request ->inatiempoadicional;
        $cl -> inaalcanzatiempo= $request ->inaalcanzatiempo;
        $cl -> inatrabajasinparar= $request ->inatrabajasinparar;
        $cl -> inaesfuerzomental= $request ->inaesfuerzomental;
        $cl -> inaexigeconcentrado= $request ->inaexigeconcentrado;
        $cl -> inaexigememoria= $request ->inaexigememoria;
        $cl -> inadesiciondificiles= $request ->inadesiciondificiles;
        $cl -> inaexigeasuntos= $request ->inaexigeasuntos;
        $cl -> inapqnosdetalles= $request ->inapqnosdetalles;
        $cl -> inaresponcosasvalor= $request ->inaresponcosasvalor;
        $cl -> inarespondinero= $request ->inarespondinero;
        $cl -> inareponderotros= $request ->inareponderotros;
        $cl -> inaresponarea= $request ->inaresponarea;
        $cl -> inareponsalud= $request ->inareponsalud;
        $cl -> inaordecontradic= $request ->inaordecontradic;
        $cl -> inahacerinnecesaria= $request ->inahacerinnecesaria;
        $cl -> inapasarnormas= $request ->inapasarnormas;
        $cl -> inamaspracticas= $request ->inamaspracticas;
        $cl -> inatrabajodenoche= $request ->inatrabajodenoche;
        $cl -> inapausas= $request ->inapausas;
        $cl -> inatrabajodiadesca= $request ->inatrabajodiadesca;
        $cl -> inafinsemdesc= $request -> inafinsemdesc;
        $cl -> inaencasapiensotra= $request ->inaencasapiensotra;
        $cl -> inadiscutofamilia= $request ->inadiscutofamilia;
        $cl -> inaasuntosencasa= $request ->inaasuntosencasa;
        $cl -> inapocotiempofami= $request ->inapocotiempofami;
        $cl -> inapermitehabilidad= $request ->inapermitehabilidad;
        $cl -> inapermiteconocimi= $request ->inapermiteconocimi;
        $cl -> inapermiteaprender= $request ->inapermiteaprender;
        $cl -> inamiscapacidades= $request ->inamiscapacidades;
        $cl -> inapausasnecesito= $request ->inapausasnecesito;
        $cl -> inatrabajodiario= $request ->inatrabajodiario;
        $cl -> inadecivelocidad= $request ->inadecivelocidad;
        $cl -> inacambiarordenact= $request ->inacambiarordenact;
        $cl -> inaatenderasunpers= $request ->inaatenderasunpers;
      $cl -> inacambiosbeneficio= $request ->inacambiosbeneficio;
      $cl -> inaexplicancambios= $request ->inaexplicancambios;
      $cl -> inapuedodarsugeren= $request ->inapuedodarsugeren;
      $cl -> inaencuentamisideas= $request ->inaencuentamisideas;
      $cl -> inacambiosdificultan= $request ->inacambiosdificultan;
      $cl -> inaclaridadfunciones= $request ->inaclaridadfunciones;
      $cl -> inadecisionesatomar= $request ->inadecisionesatomar;
      $cl -> inaresultadoslograr= $request ->inaresultadoslograr;
      $cl -> inaefectoenempresa= $request ->inaefectoenempresa;
      $cl -> inaexplicanobjetivos= $request ->inaexplicanobjetivos;
      $cl -> inaorientaciontraba= $request ->inaorientaciontraba;
      $cl -> inaresolverasuntos= $request ->inaresolverasuntos;
      $cl -> inaasiscapacitacion= $request ->inaasiscapacitacion;
      $cl -> inarecibocapacitaci= $request ->inarecibocapacitaci;
      $cl -> inarecibocapaciayuda= $request ->inarecibocapaciayuda;
      $cl -> inajefeintrucciones= $request ->inajefeintrucciones;
      $cl -> inajefeayudaorganiz= $request ->inajefeayudaorganiz;
      $cl -> inajefemispuntosvist= $request ->inajefemispuntosvist;
      $cl -> inajefeanima= $request ->inajefeanima;
      $cl -> inajefedistribuye= $request ->inajefedistribuye;
      $cl -> inajefecomunica= $request ->inajefecomunica;
      $cl -> inajefeorienracion= $request ->inajefeorienracion;
      $cl -> inajefeayudaprogres= $request ->inajefeayudaprogres;
      $cl -> inajefeayudasentime= $request ->inajefeayudasentime;
      $cl -> inajefesolucionar= $request ->inajefesolucionar;
      $cl -> inajefeconfio= $request ->inajefeconfio;
      $cl -> inajefeescucha= $request ->inajefeescucha;
      $cl -> inajefeapoyo= $request ->inajefeapoyo;
      $cl -> inaagradaambiente= $request ->inaagradaambiente;
      $cl -> inagruporespeto= $request ->inagruporespeto;
      $cl -> inaconfiocompaneros= $request ->inaconfiocompaneros;
      $cl -> inaagustocompaneros= $request ->inaagustocompaneros;
      $cl -> inagrupomaltrata= $request ->inagrupomaltrata;
      $cl -> inasolucionacompa= $request ->inasolucionacompa;
      $cl -> inaintegraciongrp= $request ->inaintegraciongrp;
      $cl -> inagrupounido= $request ->inagrupounido;
      $cl -> inasentirpartegrupo= $request ->inasentirpartegrupo;
      $cl -> inatrabajogrupo= $request ->inatrabajogrupo;
      $cl -> inagrupodeacuerdo= $request ->inagrupodeacuerdo;
      $cl -> inagrupoayuda= $request ->inagrupoayuda;
      $cl -> inaapoyounootros= $request ->inaapoyounootros;
      $cl -> inaescuchanproble= $request ->inaescuchanproble;
      $cl -> inainfhagobien= $request ->inainfhagobien;
      $cl -> inainfmejorar= $request ->inainfmejorar;
      $cl -> inainfrendimiento= $request ->inainfrendimiento;
      $cl -> inaevaluantrabajo= $request ->inaevaluantrabajo;
      $cl -> inainfatiempomejora= $request ->inainfatiempomejora;
      $cl -> inaempconfiantrab= $request ->inaempconfiantrab;
      $cl -> inaemppaganatiempo= $request ->inaemppaganatiempo;
      $cl -> inapagoofrecido= $request ->inapagoofrecido;
      $cl -> inapagomerezco= $request ->inapagomerezco;
      $cl -> inaposibprogresar= $request ->inaposibprogresar;
      $cl -> inahacerbienprog= $request ->inahacerbienprog;
      $cl -> inaempbienestartrab= $request ->inaempbienestartrab;
      $cl -> inatrabajoestable= $request ->inatrabajoestable;
      $cl -> inatrabsentirbien= $request ->inatrabsentirbien;
      $cl -> inasientoorgullo= $request ->inasientoorgullo;
      $cl -> inahablobienempres= $request ->inahablobienempres;
      $cl -> inaatencionausuarios = $request ->inaatencionausuarios;
      $cl -> inausuenojados= $request ->inausuenojados;
      $cl -> inausupreocupados= $request ->inausupreocupados;
      $cl -> inausutristes= $request ->inausutristes;
      $cl -> inausuenfermos= $request ->inausuenfermos;
      $cl -> inausuneceayuda= $request ->inausuneceayuda;
      $cl -> inausumemaltratan= $request ->inausumemaltratan;
      $cl -> inaususentimidistin= $request ->inaususentimidistin;
      $cl -> inasituaviolencia= $request ->inasituaviolencia;
      $cl -> inaexigedolorosas= $request ->inaexigedolorosas;
      $cl -> inasoyjefe = $request ->inasoyjefe;
      $cl -> inacomuntarde= $request ->inacomuntarde;
      $cl -> inairrespetuosos= $request ->inairrespetuosos;
      $cl -> inadificorganiza= $request ->inadificorganiza;
      $cl -> inaguardansilencio= $request ->inaguardansilencio;
      $cl -> inadificlogro= $request ->inadificlogro;
      $cl -> inainforirrespet= $request ->inainforirrespet;
      $cl -> inapocacooperacio= $request ->inapocacooperacio;
      $cl -> inapocodesempeno= $request ->inapocodesempeno;
      $cl -> inacolabignoran= $request ->inacolabignoran;

        $cl -> update();
        return $cl;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($inaid)
    {
        $cl = formatoA::findOrfail($inaid);
        $cl -> delete();
    }
    
        public function buscarid($inaid)
    {
    $user = formatoA::where("inaidempleado","=",$inaid)->get();
       
        return  $user;
    }
    


        public function liderazgoRelacionesA($idEmp)
    {
        $result = DB::select('SELECT * FROM vw_liderazgo_relaciones_a  where emdempresa = (?);',[$idEmp]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;
        
        $conteo00 = 0;
        $conteo10 = 0;
        $conteo20 = 0;
        $conteo30 = 0;
        $conteo40 = 0;
        
        $conteo01 = 0;
        $conteo11 = 0;
        $conteo21 = 0;
        $conteo31 = 0;
        $conteo41 = 0;
        
        $conteo02 = 0;
        $conteo12 = 0;
        $conteo22 = 0;
        $conteo32 = 0;
        $conteo42 = 0;
        
        $conteo03 = 0;
        $conteo13 = 0;
        $conteo23 = 0;
        $conteo33 = 0;
        $conteo43 = 0;
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $liderazgo = $x->liderazgo;
            $relaciones = $x->relaciones;
            $retroalimentacion = $x->retroalimentacion;
            $rela_colaboradores = $x->rela_colaboradores;
            $total_liderazgo_a = $x -> total_liderazgo_a;
            if($liderazgo == 0 or $liderazgo <= 3.8){
                $conteo0 = $conteo0 +1;
            }
            elseif($liderazgo == 3.9 or $liderazgo <= 15.4){
                $conteo1 = $conteo1 +1;
            }
            elseif($liderazgo == 15.5 or $liderazgo <= 30.8){
                $conteo2 = $conteo2 +1;
            }
            elseif($liderazgo == 30.9 or $liderazgo <= 46.2){
                $conteo3 = $conteo3 +1;
            }
            elseif($liderazgo == 46.3 or $liderazgo <= 100){
                $conteo4 = $conteo4 +1;
            }
         //
            if($relaciones == 0 or $relaciones <= 5.4){
                $conteo00 = $conteo00 +1;
            }
            elseif($relaciones == 5.5 or $relaciones <= 16.1){
                $conteo10 = $conteo10 +1;
            }
            elseif($relaciones == 16.2 or $relaciones <= 25){
                $conteo20 = $conteo20 +1;
            }
            elseif($relaciones == 25.1 or $relaciones <= 37.5){
                $conteo30 = $conteo30 +1;
            }
            elseif($relaciones == 37.6 or $relaciones <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //
            if($retroalimentacion == 0 or $retroalimentacion <= 10.0){
                $conteo01 = $conteo01 +1;
            }
            elseif($retroalimentacion == 10.1 or $retroalimentacion <= 25.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($retroalimentacion == 25.1 or $retroalimentacion <= 40){
                $conteo21 = $conteo21 +1;
            }
            elseif($retroalimentacion == 40.1 or $retroalimentacion <= 55.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($retroalimentacion == 55.1 or $retroalimentacion <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //
            if($rela_colaboradores == 0 or $rela_colaboradores <= 13.9){
                $conteo02 = $conteo02 +1;
            }
            elseif($rela_colaboradores == 14.0 or $rela_colaboradores <= 25.0){
                $conteo12 = $conteo12 +1;
            }
            elseif($rela_colaboradores == 25.1 or $rela_colaboradores <= 33.3){
                $conteo22 = $conteo22 +1;
            }
            elseif($rela_colaboradores == 33.4 or $rela_colaboradores <= 47.2){
                $conteo32 = $conteo32 +1;
            }
            elseif($rela_colaboradores == 47.3 or $rela_colaboradores <= 100){
                $conteo42 = $conteo42 +1;
            }
            
            //total_liderazgo_a
            if($total_liderazgo_a == 0 or $total_liderazgo_a <= 9.1){
                $conteo03 = $conteo03 +1;
            }
            elseif($total_liderazgo_a == 9.2 or $total_liderazgo_a <= 17.7){
                $conteo13 = $conteo13 +1;
            }
            elseif($total_liderazgo_a == 17.8 or $total_liderazgo_a <= 25.6){
                $conteo23 = $conteo23 +1;
            }
            elseif($total_liderazgo_a == 25.7 or $total_liderazgo_a <= 34.8){
                $conteo33 = $conteo33 +1;
            }
            elseif($total_liderazgo_a == 34.9 or $total_liderazgo_a <= 100){
                $conteo43 = $conteo43 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4);
        
        return $arrayFin;
    }
    
        public function controlSobreRol($idEmp)
    { 
        $result = DB::select('SELECT * FROM vw_control_a  where emdempresa = (?);',[$idEmp]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $array5 = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;
        
        $conteo00 = 0;
        $conteo10 = 0;
        $conteo20 = 0;
        $conteo30 = 0;
        $conteo40 = 0;
        
        $conteo01 = 0;
        $conteo11 = 0;
        $conteo21 = 0;
        $conteo31 = 0;
        $conteo41 = 0;
        
        $conteo02 = 0;
        $conteo12 = 0;
        $conteo22 = 0;
        $conteo32 = 0;
        $conteo42 = 0;
        
        $conteo03 = 0;
        $conteo13 = 0;
        $conteo23 = 0;
        $conteo33 = 0;
        $conteo43 = 0;
        
        $conteo04 = 0;
        $conteo14 = 0;
        $conteo24 = 0;
        $conteo34 = 0;
        $conteo44 = 0;
        
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $claridad_rol = $x->claridad_rol;
            $capacitacion = $x->capacitacion;
            $manejo_cambio = $x->	manejo_cambio;
            $oportunidades = $x->oportunidades;
            $control_autonomia = $x->control_autonomia;
            $total_control_a = $x->total_control_a;
            //claridad
            if($claridad_rol == 0 or $claridad_rol <= 0.9){
                $conteo0 = $conteo0 +1;
            }
            elseif($claridad_rol == 1.0 or $claridad_rol <= 10.7){
                $conteo1 = $conteo1 +1;
            }
            elseif($claridad_rol == 10.8 or $claridad_rol <= 21.4){
                $conteo2 = $conteo2 +1;
            }
            elseif($claridad_rol == 21.5 or $claridad_rol <= 39.3){
                $conteo3 = $conteo3 +1;
            }
            elseif($claridad_rol == 39.4 or $claridad_rol <= 100){
                $conteo4 = $conteo4 +1;
            }
         //capacitiacion
            if($capacitacion == 0 or $capacitacion <= 0.9){
                $conteo00 = $conteo00 +1;
            }
            elseif($capacitacion == 1.0 or $capacitacion <= 16.7){
                $conteo10 = $conteo10 +1;
            }
            elseif($capacitacion == 16.8 or $capacitacion <= 33.3){
                $conteo20 = $conteo20 +1;
            }
            elseif($capacitacion == 33.4 or $capacitacion <= 50.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($capacitacion == 51.0 or $capacitacion <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //manejo
            if($manejo_cambio == 0 or $manejo_cambio <= 12.5){
                $conteo01 = $conteo01 +1;
            }
            elseif($manejo_cambio == 12.6 or $manejo_cambio <= 25.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($manejo_cambio == 25.1 or $manejo_cambio <= 37.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($manejo_cambio == 37.6 or $manejo_cambio <= 50.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($manejo_cambio == 50.1 or $manejo_cambio <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //oportunidad
            if($oportunidades == 0 or $oportunidades <= 0.9){
                $conteo02 = $conteo02 +1;
            }
            elseif($oportunidades == 1.0 or $oportunidades <= 6.3){
                $conteo12 = $conteo12 +1;
            }
            elseif($oportunidades == 6.4 or $oportunidades <= 18.8){
                $conteo22 = $conteo22 +1;
            }
            elseif($oportunidades == 18.9 or $oportunidades <= 31.3){
                $conteo32 = $conteo32 +1;
            }
            elseif($oportunidades == 31.4 or $oportunidades <= 100){
                $conteo42 = $conteo42 +1;
            }
            
              //control
            if($control_autonomia == 0 or $control_autonomia <= 8.3){
                $conteo03 = $conteo03 +1;
            }
            elseif($control_autonomia == 8.4 or $control_autonomia <= 25.0){
                $conteo13 = $conteo13 +1;
            }
            elseif($control_autonomia == 25.1 or $control_autonomia <= 41.7){
                $conteo23 = $conteo23 +1;
            }
            elseif($control_autonomia == 41.8 or $control_autonomia <= 58.3){
                $conteo33 = $conteo33 +1;
            }
            elseif($control_autonomia == 58.4 or $control_autonomia <= 100){
                $conteo43 = $conteo43 +1;
            }
            
            //total_control_a
            if($total_control_a == 0 or $total_control_a <= 10.7){
                $conteo04 = $conteo04 +1;
            }
            elseif($total_control_a == 10.8 or $total_control_a <= 19.0){
                $conteo14 = $conteo14 +1;
            }
            elseif($total_control_a == 19.1 or $total_control_a <= 29.8){
                $conteo24 = $conteo24 +1;
            }
            elseif($total_control_a == 29.9 or $total_control_a <= 40.5){
                $conteo34 = $conteo34 +1;
            }
            elseif($total_control_a == 40.6 or $total_control_a <= 100){
                $conteo44 = $conteo44 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($array5,$conteo04,$conteo14,$conteo24,$conteo34,$conteo44);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4,$array5);
        
        return $arrayFin;
    }
    
        public function DemandasTrabajo($idEmp)
    { 
        $result = DB::select('SELECT * FROM vw_demanda_trabajo_a  where emdempresa = (?);',[$idEmp]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $array5 = array();
        $array6 = array();
        $array7 = array();
        $array8 = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;
        
        $conteo00 = 0;
        $conteo10 = 0;
        $conteo20 = 0;
        $conteo30 = 0;
        $conteo40 = 0;
        
        $conteo01 = 0;
        $conteo11 = 0;
        $conteo21 = 0;
        $conteo31 = 0;
        $conteo41 = 0;
        
        $conteo02 = 0;
        $conteo12 = 0;
        $conteo22 = 0;
        $conteo32 = 0;
        $conteo42 = 0;
        
        $conteo03 = 0;
        $conteo13 = 0;
        $conteo23 = 0;
        $conteo33 = 0;
        $conteo43 = 0;
        
        $conteo04 = 0;
        $conteo14 = 0;
        $conteo24 = 0;
        $conteo34 = 0;
        $conteo44 = 0;
        
        $conteo05 = 0;
        $conteo15 = 0;
        $conteo25 = 0;
        $conteo35 = 0;
        $conteo45 = 0;
        
        $conteo06 = 0;
        $conteo16 = 0;
        $conteo26 = 0;
        $conteo36 = 0;
        $conteo46 = 0;
        
        $conteo07 = 0;
        $conteo17 = 0;
        $conteo27 = 0;
        $conteo37 = 0;
        $conteo47 = 0;
        
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $demandas_ambientales = $x->demandas_ambientales;
            $reponsabilidad = $x->reponsabilidad;
            $consistencia_rol = $x->consistencia_rol;
            $demandas_emocionales = $x->demandas_emocionales;
            $demandas_jornada = $x->demandas_jornada;
             $influ_extralaboral = $x->influ_extralaboral;
            $demandas_cuantitativas = $x->demandas_cuantitativas;
            $demandas_mental = $x->demandas_mental;
            $total_demandas_a = $x -> total_demandas_a;
            
            
            
            //demandas_ambientales
            if($demandas_ambientales == 0 or $demandas_ambientales <= 14.6){
                $conteo0 = $conteo0 +1;
            }
            elseif($demandas_ambientales == 14.7 or $demandas_ambientales <= 22.9){
                $conteo1 = $conteo1 +1;
            }
            elseif($demandas_ambientales == 23.0 or $demandas_ambientales <= 31.3){
                $conteo2 = $conteo2 +1;
            }
            elseif($demandas_ambientales == 31.4 or $demandas_ambientales <= 39.6){
                $conteo3 = $conteo3 +1;
            }
            elseif($demandas_ambientales == 39.7 or $demandas_ambientales <= 100){
                $conteo4 = $conteo4 +1;
            }
         //reponsabilidad
            if($reponsabilidad == 0 or $reponsabilidad <= 37.5){
                $conteo00 = $conteo00 +1;
            }
            elseif($reponsabilidad == 37.6 or $reponsabilidad <= 54.2){
                $conteo10 = $conteo10 +1;
            }
            elseif($reponsabilidad == 54.3 or $reponsabilidad <= 66.7){
                $conteo20 = $conteo20 +1;
            }
            elseif($reponsabilidad == 66.8 or $reponsabilidad <= 79.2){
                $conteo30 = $conteo30 +1;
            }
            elseif($reponsabilidad == 79.3 or $reponsabilidad <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //consistencia_rol
            if($consistencia_rol == 0 or $consistencia_rol <= 15.0){
                $conteo01 = $conteo01 +1;
            }
            elseif($consistencia_rol == 15.1 or $consistencia_rol <= 25.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($consistencia_rol == 25.1 or $consistencia_rol <= 35.0){
                $conteo21 = $conteo21 +1;
            }
            elseif($consistencia_rol == 35.1 or $consistencia_rol <= 45.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($consistencia_rol == 45.1 or $consistencia_rol <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //demandas_emocionales
            if($demandas_emocionales == 0 or $demandas_emocionales <= 16.7){
                $conteo02 = $conteo02 +1;
            }
            elseif($demandas_emocionales == 16.8 or $demandas_emocionales <= 25.0){
                $conteo12 = $conteo12 +1;
            }
            elseif($demandas_emocionales == 25.1 or $demandas_emocionales <= 33.3){
                $conteo22 = $conteo22 +1;
            }
            elseif($demandas_emocionales == 33.4 or $demandas_emocionales <= 47.2){
                $conteo32 = $conteo32 +1;
            }
            elseif($demandas_emocionales == 47.3 or $demandas_emocionales <= 100){
                $conteo42 = $conteo42 +1;
            }
            
              //demandas_jornada
            if($demandas_jornada == 0 or $demandas_jornada <= 8.3){
                $conteo03 = $conteo03 +1;
            }
            elseif($demandas_jornada == 8.4 or $demandas_jornada <= 25.0){
                $conteo13 = $conteo13 +1;
            }
            elseif($demandas_jornada == 25.1 or $demandas_jornada <= 33.3){
                $conteo23 = $conteo23 +1;
            }
            elseif($demandas_jornada == 33.4 or $demandas_jornada <= 50.0){
                $conteo33 = $conteo33 +1;
            }
            elseif($demandas_jornada == 50.1 or $demandas_jornada <= 100){
                $conteo43 = $conteo43 +1;
            }
            
              //$influ_extralaboral
            if($influ_extralaboral == 0 or $influ_extralaboral <= 18.8){
                $conteo04 = $conteo04 +1;
            }
            elseif($influ_extralaboral == 18.9 or $influ_extralaboral <= 31.3){
                $conteo14 = $conteo14 +1;
            }
            elseif($influ_extralaboral == 31.4 or $influ_extralaboral <= 43.8){
                $conteo24 = $conteo24 +1;
            }
            elseif($influ_extralaboral == 43.9 or $influ_extralaboral <= 50.0){
                $conteo34 = $conteo34 +1;
            }
            elseif($influ_extralaboral == 50.1 or $influ_extralaboral <= 100){
                $conteo44 = $conteo44 +1;
            }
            
               //demandas_cuantitativas
            if($demandas_cuantitativas == 0 or $demandas_cuantitativas <= 25.0){
                $conteo05 = $conteo05 +1;
            }
            elseif($demandas_cuantitativas == 25.1 or $demandas_cuantitativas <= 33.3){
                $conteo15 = $conteo15 +1;
            }
            elseif($demandas_cuantitativas == 33.4 or $demandas_cuantitativas <= 45.8){
                $conteo25 = $conteo25 +1;
            }
            elseif($demandas_cuantitativas == 45.9 or $demandas_cuantitativas <= 54.2){
                $conteo35 = $conteo35 +1;
            }
            elseif($demandas_cuantitativas == 54.3 or $demandas_cuantitativas <= 100){
                $conteo45 = $conteo45 +1;
            }
               //demandas_mental
            if($demandas_mental == 0 or $demandas_mental <= 60.0){
                $conteo06 = $conteo06 +1;
            }
            elseif($demandas_mental == 60.1 or $demandas_mental <= 70.0){
                $conteo16 = $conteo16 +1;
            }
            elseif($demandas_mental == 70.1 or $demandas_mental <= 80.0){
                $conteo26 = $conteo26 +1;
            }
            elseif($demandas_mental == 80.1 or $demandas_mental <= 90.0){
                $conteo36 = $conteo36 +1;
            }
            elseif($demandas_mental == 90.1 or $demandas_mental <= 100){
                $conteo46 = $conteo46 +1;
            }
            
            //$total_demandas_a
            if($total_demandas_a == 0 or $total_demandas_a <= 28.5){
                $conteo07 = $conteo07 +1;
            }
            elseif($total_demandas_a == 28.6 or $total_demandas_a <= 35.0){
                $conteo17 = $conteo17 +1;
            }
            elseif($total_demandas_a == 35.1 or $total_demandas_a <= 41.5){
                $conteo27 = $conteo27 +1;
            }
            elseif($total_demandas_a == 41.6 or $total_demandas_a <= 47.5){
                $conteo37 = $conteo37 +1;
            }
            elseif($total_demandas_a == 47.6 or $total_demandas_a <= 100){
                $conteo47 = $conteo47 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($array5,$conteo04,$conteo14,$conteo24,$conteo34,$conteo44);
         array_push($array6,$conteo05,$conteo15,$conteo25,$conteo35,$conteo45);
         array_push($array7,$conteo06,$conteo16,$conteo26,$conteo36,$conteo46);
         array_push($array8,$conteo07,$conteo17,$conteo27,$conteo37,$conteo47);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4,$array5,$array6,$array7,$array8);
        
        return $arrayFin;
    }
    
        public function recompensas($idEmp)
    {
        $result = DB::select('SELECT * FROM vw_recompensa_a  where emdempresa = (?);',[$idEmp]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;
        
        $conteo00 = 0;
        $conteo10 = 0;
        $conteo20 = 0;
        $conteo30 = 0;
        $conteo40 = 0;
        
        $conteo01 = 0;
        $conteo11 = 0;
        $conteo21 = 0;
        $conteo31 = 0;
        $conteo41 = 0;

         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $recompensas_trabajo = $x->recompensas_trabajo;
            $reconocimiento = $x->reconocimiento;
            $total_recompensa = $x ->total_recompensa;
            
            if($recompensas_trabajo == 0 or $recompensas_trabajo <= 0.9){
                $conteo0 = $conteo0 +1;
            }
            elseif($recompensas_trabajo == 1.0 or $recompensas_trabajo <= 5.0){
                $conteo1 = $conteo1 +1;
            }
            elseif($recompensas_trabajo == 5.1 or $recompensas_trabajo <= 10.0){
                $conteo2 = $conteo2 +1;
            }
            elseif($recompensas_trabajo == 10.1 or $recompensas_trabajo <= 20.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($recompensas_trabajo == 20.1 or $recompensas_trabajo <= 100){
                $conteo4 = $conteo4 +1;
            }
         //
            if($reconocimiento == 0 or $reconocimiento <= 4.2){
                $conteo00 = $conteo00 +1;
            }
            elseif($reconocimiento == 4.3 or $reconocimiento <= 16.7){
                $conteo10 = $conteo10 +1;
            }
            elseif($reconocimiento == 16.8 or $reconocimiento <= 25){
                $conteo20 = $conteo20 +1;
            }
            elseif($reconocimiento == 25.1 or $reconocimiento <= 37.5){
                $conteo30 = $conteo30 +1;
            }
            elseif($reconocimiento == 37.6 or $reconocimiento <= 100){
                $conteo40 = $conteo40 +1;
            }
            
            //total_recompensa
            if($total_recompensa == 0 or $total_recompensa <= 4.5){
                $conteo01 = $conteo01 +1;
            }
            elseif($total_recompensa == 4.6 or $total_recompensa <= 11.4){
                $conteo11 = $conteo11 +1;
            }
            elseif($total_recompensa == 11.5 or $total_recompensa <= 20.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($total_recompensa == 20.6 or $total_recompensa <= 29.5){
                $conteo31 = $conteo31 +1;
            }
            elseif($total_recompensa == 29.6 or $total_recompensa <= 100){
                $conteo41 = $conteo41 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($arrayFin,$array,$array1,$array2);
        
        return $arrayFin;
    }
    
    public function liderazgoRelacionesAByFecha($idEmp,$fecha1,$fecha2)
    {
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_liderazgo_relaciones_a  where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;
        
        $conteo00 = 0;
        $conteo10 = 0;
        $conteo20 = 0;
        $conteo30 = 0;
        $conteo40 = 0;
        
        $conteo01 = 0;
        $conteo11 = 0;
        $conteo21 = 0;
        $conteo31 = 0;
        $conteo41 = 0;
        
        $conteo02 = 0;
        $conteo12 = 0;
        $conteo22 = 0;
        $conteo32 = 0;
        $conteo42 = 0;
        
        $conteo03 = 0;
        $conteo13 = 0;
        $conteo23 = 0;
        $conteo33 = 0;
        $conteo43 = 0;
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $liderazgo = $x->liderazgo;
            $relaciones = $x->relaciones;
            $retroalimentacion = $x->retroalimentacion;
            $rela_colaboradores = $x->rela_colaboradores;
            $total_liderazgo_a = $x -> total_liderazgo_a;
            if($liderazgo == 0 or $liderazgo <= 3.8){
                $conteo0 = $conteo0 +1;
            }
            elseif($liderazgo == 3.9 or $liderazgo <= 15.4){
                $conteo1 = $conteo1 +1;
            }
            elseif($liderazgo == 15.5 or $liderazgo <= 30.8){
                $conteo2 = $conteo2 +1;
            }
            elseif($liderazgo == 30.9 or $liderazgo <= 46.2){
                $conteo3 = $conteo3 +1;
            }
            elseif($liderazgo == 46.3 or $liderazgo <= 100){
                $conteo4 = $conteo4 +1;
            }
         //
            if($relaciones == 0 or $relaciones <= 5.4){
                $conteo00 = $conteo00 +1;
            }
            elseif($relaciones == 5.5 or $relaciones <= 16.1){
                $conteo10 = $conteo10 +1;
            }
            elseif($relaciones == 16.2 or $relaciones <= 25){
                $conteo20 = $conteo20 +1;
            }
            elseif($relaciones == 25.1 or $relaciones <= 37.5){
                $conteo30 = $conteo30 +1;
            }
            elseif($relaciones == 37.6 or $relaciones <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //
            if($retroalimentacion == 0 or $retroalimentacion <= 10.0){
                $conteo01 = $conteo01 +1;
            }
            elseif($retroalimentacion == 10.1 or $retroalimentacion <= 25.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($retroalimentacion == 25.1 or $retroalimentacion <= 40){
                $conteo21 = $conteo21 +1;
            }
            elseif($retroalimentacion == 40.1 or $retroalimentacion <= 55.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($retroalimentacion == 55.1 or $retroalimentacion <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //
            if($rela_colaboradores == 0 or $rela_colaboradores <= 13.9){
                $conteo02 = $conteo02 +1;
            }
            elseif($rela_colaboradores == 14.0 or $rela_colaboradores <= 25.0){
                $conteo12 = $conteo12 +1;
            }
            elseif($rela_colaboradores == 25.1 or $rela_colaboradores <= 33.3){
                $conteo22 = $conteo22 +1;
            }
            elseif($rela_colaboradores == 33.4 or $rela_colaboradores <= 47.2){
                $conteo32 = $conteo32 +1;
            }
            elseif($rela_colaboradores == 47.3 or $rela_colaboradores <= 100){
                $conteo42 = $conteo42 +1;
            }
            
            //total_liderazgo_a
            if($total_liderazgo_a == 0 or $total_liderazgo_a <= 9.1){
                $conteo03 = $conteo03 +1;
            }
            elseif($total_liderazgo_a == 9.2 or $total_liderazgo_a <= 17.7){
                $conteo13 = $conteo13 +1;
            }
            elseif($total_liderazgo_a == 17.8 or $total_liderazgo_a <= 25.6){
                $conteo23 = $conteo23 +1;
            }
            elseif($total_liderazgo_a == 25.7 or $total_liderazgo_a <= 34.8){
                $conteo33 = $conteo33 +1;
            }
            elseif($total_liderazgo_a == 34.9 or $total_liderazgo_a <= 100){
                $conteo43 = $conteo43 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4);
        
        return $arrayFin;
    }
    
    public function controlSobreRolByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_control_a  where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $array5 = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;
        
        $conteo00 = 0;
        $conteo10 = 0;
        $conteo20 = 0;
        $conteo30 = 0;
        $conteo40 = 0;
        
        $conteo01 = 0;
        $conteo11 = 0;
        $conteo21 = 0;
        $conteo31 = 0;
        $conteo41 = 0;
        
        $conteo02 = 0;
        $conteo12 = 0;
        $conteo22 = 0;
        $conteo32 = 0;
        $conteo42 = 0;
        
        $conteo03 = 0;
        $conteo13 = 0;
        $conteo23 = 0;
        $conteo33 = 0;
        $conteo43 = 0;
        
        $conteo04 = 0;
        $conteo14 = 0;
        $conteo24 = 0;
        $conteo34 = 0;
        $conteo44 = 0;
        
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $claridad_rol = $x->claridad_rol;
            $capacitacion = $x->capacitacion;
            $manejo_cambio = $x->	manejo_cambio;
            $oportunidades = $x->oportunidades;
            $control_autonomia = $x->control_autonomia;
            $total_control_a = $x->total_control_a;
            //claridad
            if($claridad_rol == 0 or $claridad_rol <= 0.9){
                $conteo0 = $conteo0 +1;
            }
            elseif($claridad_rol == 1.0 or $claridad_rol <= 10.7){
                $conteo1 = $conteo1 +1;
            }
            elseif($claridad_rol == 10.8 or $claridad_rol <= 21.4){
                $conteo2 = $conteo2 +1;
            }
            elseif($claridad_rol == 21.5 or $claridad_rol <= 39.3){
                $conteo3 = $conteo3 +1;
            }
            elseif($claridad_rol == 39.4 or $claridad_rol <= 100){
                $conteo4 = $conteo4 +1;
            }
         //capacitiacion
            if($capacitacion == 0 or $capacitacion <= 0.9){
                $conteo00 = $conteo00 +1;
            }
            elseif($capacitacion == 1.0 or $capacitacion <= 16.7){
                $conteo10 = $conteo10 +1;
            }
            elseif($capacitacion == 16.8 or $capacitacion <= 33.3){
                $conteo20 = $conteo20 +1;
            }
            elseif($capacitacion == 33.4 or $capacitacion <= 50.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($capacitacion == 51.0 or $capacitacion <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //manejo
            if($manejo_cambio == 0 or $manejo_cambio <= 12.5){
                $conteo01 = $conteo01 +1;
            }
            elseif($manejo_cambio == 12.6 or $manejo_cambio <= 25.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($manejo_cambio == 25.1 or $manejo_cambio <= 37.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($manejo_cambio == 37.6 or $manejo_cambio <= 50.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($manejo_cambio == 50.1 or $manejo_cambio <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //oportunidad
            if($oportunidades == 0 or $oportunidades <= 0.9){
                $conteo02 = $conteo02 +1;
            }
            elseif($oportunidades == 1.0 or $oportunidades <= 6.3){
                $conteo12 = $conteo12 +1;
            }
            elseif($oportunidades == 6.4 or $oportunidades <= 18.8){
                $conteo22 = $conteo22 +1;
            }
            elseif($oportunidades == 18.9 or $oportunidades <= 31.3){
                $conteo32 = $conteo32 +1;
            }
            elseif($oportunidades == 31.4 or $oportunidades <= 100){
                $conteo42 = $conteo42 +1;
            }
            
              //control
            if($control_autonomia == 0 or $control_autonomia <= 8.3){
                $conteo03 = $conteo03 +1;
            }
            elseif($control_autonomia == 8.4 or $control_autonomia <= 25.0){
                $conteo13 = $conteo13 +1;
            }
            elseif($control_autonomia == 25.1 or $control_autonomia <= 41.7){
                $conteo23 = $conteo23 +1;
            }
            elseif($control_autonomia == 41.8 or $control_autonomia <= 58.3){
                $conteo33 = $conteo33 +1;
            }
            elseif($control_autonomia == 58.4 or $control_autonomia <= 100){
                $conteo43 = $conteo43 +1;
            }
            
            //total_control_a
            if($total_control_a == 0 or $total_control_a <= 10.7){
                $conteo04 = $conteo04 +1;
            }
            elseif($total_control_a == 10.8 or $total_control_a <= 19.0){
                $conteo14 = $conteo14 +1;
            }
            elseif($total_control_a == 19.1 or $total_control_a <= 29.8){
                $conteo24 = $conteo24 +1;
            }
            elseif($total_control_a == 29.9 or $total_control_a <= 40.5){
                $conteo34 = $conteo34 +1;
            }
            elseif($total_control_a == 40.6 or $total_control_a <= 100){
                $conteo44 = $conteo44 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($array5,$conteo04,$conteo14,$conteo24,$conteo34,$conteo44);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4,$array5);
        
        return $arrayFin;
    }
    
    public function DemandasTrabajoByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_demanda_trabajo_a  where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $array5 = array();
        $array6 = array();
        $array7 = array();
        $array8 = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;
        
        $conteo00 = 0;
        $conteo10 = 0;
        $conteo20 = 0;
        $conteo30 = 0;
        $conteo40 = 0;
        
        $conteo01 = 0;
        $conteo11 = 0;
        $conteo21 = 0;
        $conteo31 = 0;
        $conteo41 = 0;
        
        $conteo02 = 0;
        $conteo12 = 0;
        $conteo22 = 0;
        $conteo32 = 0;
        $conteo42 = 0;
        
        $conteo03 = 0;
        $conteo13 = 0;
        $conteo23 = 0;
        $conteo33 = 0;
        $conteo43 = 0;
        
        $conteo04 = 0;
        $conteo14 = 0;
        $conteo24 = 0;
        $conteo34 = 0;
        $conteo44 = 0;
        
        $conteo05 = 0;
        $conteo15 = 0;
        $conteo25 = 0;
        $conteo35 = 0;
        $conteo45 = 0;
        
        $conteo06 = 0;
        $conteo16 = 0;
        $conteo26 = 0;
        $conteo36 = 0;
        $conteo46 = 0;
        
        $conteo07 = 0;
        $conteo17 = 0;
        $conteo27 = 0;
        $conteo37 = 0;
        $conteo47 = 0;
        
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $demandas_ambientales = $x->demandas_ambientales;
            $reponsabilidad = $x->reponsabilidad;
            $consistencia_rol = $x->consistencia_rol;
            $demandas_emocionales = $x->demandas_emocionales;
            $demandas_jornada = $x->demandas_jornada;
             $influ_extralaboral = $x->influ_extralaboral;
            $demandas_cuantitativas = $x->demandas_cuantitativas;
            $demandas_mental = $x->demandas_mental;
            $total_demandas_a = $x -> total_demandas_a;
            
            
            
            //demandas_ambientales
            if($demandas_ambientales == 0 or $demandas_ambientales <= 14.6){
                $conteo0 = $conteo0 +1;
            }
            elseif($demandas_ambientales == 14.7 or $demandas_ambientales <= 22.9){
                $conteo1 = $conteo1 +1;
            }
            elseif($demandas_ambientales == 23.0 or $demandas_ambientales <= 31.3){
                $conteo2 = $conteo2 +1;
            }
            elseif($demandas_ambientales == 31.4 or $demandas_ambientales <= 39.6){
                $conteo3 = $conteo3 +1;
            }
            elseif($demandas_ambientales == 39.7 or $demandas_ambientales <= 100){
                $conteo4 = $conteo4 +1;
            }
         //reponsabilidad
            if($reponsabilidad == 0 or $reponsabilidad <= 37.5){
                $conteo00 = $conteo00 +1;
            }
            elseif($reponsabilidad == 37.6 or $reponsabilidad <= 54.2){
                $conteo10 = $conteo10 +1;
            }
            elseif($reponsabilidad == 54.3 or $reponsabilidad <= 66.7){
                $conteo20 = $conteo20 +1;
            }
            elseif($reponsabilidad == 66.8 or $reponsabilidad <= 79.2){
                $conteo30 = $conteo30 +1;
            }
            elseif($reponsabilidad == 79.3 or $reponsabilidad <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //consistencia_rol
            if($consistencia_rol == 0 or $consistencia_rol <= 15.0){
                $conteo01 = $conteo01 +1;
            }
            elseif($consistencia_rol == 15.1 or $consistencia_rol <= 25.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($consistencia_rol == 25.1 or $consistencia_rol <= 35.0){
                $conteo21 = $conteo21 +1;
            }
            elseif($consistencia_rol == 35.1 or $consistencia_rol <= 45.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($consistencia_rol == 45.1 or $consistencia_rol <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //demandas_emocionales
            if($demandas_emocionales == 0 or $demandas_emocionales <= 16.7){
                $conteo02 = $conteo02 +1;
            }
            elseif($demandas_emocionales == 16.8 or $demandas_emocionales <= 25.0){
                $conteo12 = $conteo12 +1;
            }
            elseif($demandas_emocionales == 25.1 or $demandas_emocionales <= 33.3){
                $conteo22 = $conteo22 +1;
            }
            elseif($demandas_emocionales == 33.4 or $demandas_emocionales <= 47.2){
                $conteo32 = $conteo32 +1;
            }
            elseif($demandas_emocionales == 47.3 or $demandas_emocionales <= 100){
                $conteo42 = $conteo42 +1;
            }
            
              //demandas_jornada
            if($demandas_jornada == 0 or $demandas_jornada <= 8.3){
                $conteo03 = $conteo03 +1;
            }
            elseif($demandas_jornada == 8.4 or $demandas_jornada <= 25.0){
                $conteo13 = $conteo13 +1;
            }
            elseif($demandas_jornada == 25.1 or $demandas_jornada <= 33.3){
                $conteo23 = $conteo23 +1;
            }
            elseif($demandas_jornada == 33.4 or $demandas_jornada <= 50.0){
                $conteo33 = $conteo33 +1;
            }
            elseif($demandas_jornada == 50.1 or $demandas_jornada <= 100){
                $conteo43 = $conteo43 +1;
            }
            
              //$influ_extralaboral
            if($influ_extralaboral == 0 or $influ_extralaboral <= 18.8){
                $conteo04 = $conteo04 +1;
            }
            elseif($influ_extralaboral == 18.9 or $influ_extralaboral <= 31.3){
                $conteo14 = $conteo14 +1;
            }
            elseif($influ_extralaboral == 31.4 or $influ_extralaboral <= 43.8){
                $conteo24 = $conteo24 +1;
            }
            elseif($influ_extralaboral == 43.9 or $influ_extralaboral <= 50.0){
                $conteo34 = $conteo34 +1;
            }
            elseif($influ_extralaboral == 50.1 or $influ_extralaboral <= 100){
                $conteo44 = $conteo44 +1;
            }
            
               //demandas_cuantitativas
            if($demandas_cuantitativas == 0 or $demandas_cuantitativas <= 25.0){
                $conteo05 = $conteo05 +1;
            }
            elseif($demandas_cuantitativas == 25.1 or $demandas_cuantitativas <= 33.3){
                $conteo15 = $conteo15 +1;
            }
            elseif($demandas_cuantitativas == 33.4 or $demandas_cuantitativas <= 45.8){
                $conteo25 = $conteo25 +1;
            }
            elseif($demandas_cuantitativas == 45.9 or $demandas_cuantitativas <= 54.2){
                $conteo35 = $conteo35 +1;
            }
            elseif($demandas_cuantitativas == 54.3 or $demandas_cuantitativas <= 100){
                $conteo45 = $conteo45 +1;
            }
               //demandas_mental
            if($demandas_mental == 0 or $demandas_mental <= 60.0){
                $conteo06 = $conteo06 +1;
            }
            elseif($demandas_mental == 60.1 or $demandas_mental <= 70.0){
                $conteo16 = $conteo16 +1;
            }
            elseif($demandas_mental == 70.1 or $demandas_mental <= 80.0){
                $conteo26 = $conteo26 +1;
            }
            elseif($demandas_mental == 80.1 or $demandas_mental <= 90.0){
                $conteo36 = $conteo36 +1;
            }
            elseif($demandas_mental == 90.1 or $demandas_mental <= 100){
                $conteo46 = $conteo46 +1;
            }
            
            //$total_demandas_a
            if($total_demandas_a == 0 or $total_demandas_a <= 28.5){
                $conteo07 = $conteo07 +1;
            }
            elseif($total_demandas_a == 28.6 or $total_demandas_a <= 35.0){
                $conteo17 = $conteo17 +1;
            }
            elseif($total_demandas_a == 35.1 or $total_demandas_a <= 41.5){
                $conteo27 = $conteo27 +1;
            }
            elseif($total_demandas_a == 41.6 or $total_demandas_a <= 47.5){
                $conteo37 = $conteo37 +1;
            }
            elseif($total_demandas_a == 47.6 or $total_demandas_a <= 100){
                $conteo47 = $conteo47 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($array5,$conteo04,$conteo14,$conteo24,$conteo34,$conteo44);
         array_push($array6,$conteo05,$conteo15,$conteo25,$conteo35,$conteo45);
         array_push($array7,$conteo06,$conteo16,$conteo26,$conteo36,$conteo46);
         array_push($array8,$conteo07,$conteo17,$conteo27,$conteo37,$conteo47);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4,$array5,$array6,$array7,$array8);
        
        return $arrayFin;
    }
    
    public function recompensasByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_recompensa_a  where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;
        
        $conteo00 = 0;
        $conteo10 = 0;
        $conteo20 = 0;
        $conteo30 = 0;
        $conteo40 = 0;
        
        $conteo01 = 0;
        $conteo11 = 0;
        $conteo21 = 0;
        $conteo31 = 0;
        $conteo41 = 0;

         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $recompensas_trabajo = $x->recompensas_trabajo;
            $reconocimiento = $x->reconocimiento;
            $total_recompensa = $x ->total_recompensa;
            
            if($recompensas_trabajo == 0 or $recompensas_trabajo <= 0.9){
                $conteo0 = $conteo0 +1;
            }
            elseif($recompensas_trabajo == 1.0 or $recompensas_trabajo <= 5.0){
                $conteo1 = $conteo1 +1;
            }
            elseif($recompensas_trabajo == 5.1 or $recompensas_trabajo <= 10.0){
                $conteo2 = $conteo2 +1;
            }
            elseif($recompensas_trabajo == 10.1 or $recompensas_trabajo <= 20.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($recompensas_trabajo == 20.1 or $recompensas_trabajo <= 100){
                $conteo4 = $conteo4 +1;
            }
         //
            if($reconocimiento == 0 or $reconocimiento <= 4.2){
                $conteo00 = $conteo00 +1;
            }
            elseif($reconocimiento == 4.3 or $reconocimiento <= 16.7){
                $conteo10 = $conteo10 +1;
            }
            elseif($reconocimiento == 16.8 or $reconocimiento <= 25){
                $conteo20 = $conteo20 +1;
            }
            elseif($reconocimiento == 25.1 or $reconocimiento <= 37.5){
                $conteo30 = $conteo30 +1;
            }
            elseif($reconocimiento == 37.6 or $reconocimiento <= 100){
                $conteo40 = $conteo40 +1;
            }
            
            //total_recompensa
            if($total_recompensa == 0 or $total_recompensa <= 4.5){
                $conteo01 = $conteo01 +1;
            }
            elseif($total_recompensa == 4.6 or $total_recompensa <= 11.4){
                $conteo11 = $conteo11 +1;
            }
            elseif($total_recompensa == 11.5 or $total_recompensa <= 20.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($total_recompensa == 20.6 or $total_recompensa <= 29.5){
                $conteo31 = $conteo31 +1;
            }
            elseif($total_recompensa == 29.6 or $total_recompensa <= 100){
                $conteo41 = $conteo41 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($arrayFin,$array,$array1,$array2);
        
        return $arrayFin;
    }
}
