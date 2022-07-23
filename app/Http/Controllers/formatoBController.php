<?php

namespace App\Http\Controllers;
use App\Models\formatoB;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
class formatoBController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return formatoB::all();
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
        return formatoB::create($request->all());
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
        $cl = formatoB::findOrfail($inaid);
        
        $cl -> inbidempleado= $request ->inbidempleado;
        $cl -> inbruido= $request ->inbruido;
        $cl -> inbfrio= $request ->inbfrio;
        $cl -> inbcalor= $request ->inbcalor;
        $cl -> inbairefresco= $request ->inbairefresco;
        $cl -> inbluz= $request ->inbluz;
        $cl -> inbcomodo= $request ->inbcomodo;
        $cl -> inbsustanquimicas= $request ->inbsustanquimicas;
        $cl -> inbesfuerzofisico= $request ->inbesfuerzofisico;
        $cl -> inbequiposcomodos= $request ->inbequiposcomodos;
        $cl -> inbanimalesplantas= $request ->inbanimalesplantas;
        $cl -> inbpreoaccidente= $request ->inbpreoaccidente;
        $cl -> inblugarlimpio= $request ->inblugarlimpio;
        $cl -> inbtiempoadicional= $request ->inbtiempoadicional;
        $cl -> inbalcanzatiempo= $request ->inbalcanzatiempo;
        $cl -> inbtrabajasinparar= $request ->inbtrabajasinparar;
        $cl -> inbesfuerzomental= $request ->inbesfuerzomental;
        $cl -> inbexigeconcentrado= $request ->inbexigeconcentrado;
        $cl -> inbexigememoria= $request ->inbexigememoria;
        $cl -> inbhacercalculos= $request ->inbhacercalculos;
        $cl -> inbpqnosdetalles= $request ->inbpqnosdetalles;
        $cl -> inbtrabajonoche= $request ->inbtrabajonoche;
        $cl -> inbtomarpausas= $request ->inbtomarpausas;
        $cl -> inbtrabajodiadesca= $request ->inbtrabajodiadesca;
        $cl -> inbfinsemdesc= $request ->inbfinsemdesc;
        $cl -> inbencasapiensotra= $request ->inbencasapiensotra;
        $cl -> inbdiscutofamilia= $request ->inbdiscutofamilia;
        $cl -> inbasuntosencasa= $request ->inbasuntosencasa;
        $cl -> inbpocotiempofami= $request ->inbpocotiempofami;
        $cl -> inbhacercosasnuevas= $request ->inbhacercosasnuevas;
        $cl -> inbpermitehabilidad= $request ->inbpermitehabilidad;
        $cl -> inbpermiteconocimi= $request ->inbpermiteconocimi;
        $cl -> inbpermiteaprender= $request ->inbpermiteaprender;
        $cl -> inbpausasnecesito= $request ->inbpausasnecesito;
        $cl -> inbtrabajodiario= $request ->inbtrabajodiario;
        $cl -> inbdecivelocidad= $request ->inbdecivelocidad;
        $cl -> inbcambiarordenact= $request ->inbcambiarordenact;
        $cl -> inbatenderasunpers= $request ->inbatenderasunpers;
        $cl -> inbexplicancambios= $request ->inbexplicancambios;
        $cl -> inbpuedodarsugeren= $request ->inbpuedodarsugeren;
        $cl -> inbencuentamisideas= $request ->inbencuentamisideas;
        $cl -> inbclaridadfunciones= $request ->inbclaridadfunciones;
        $cl -> inbdecisionesatomar= $request ->inbdecisionesatomar;
        $cl -> inbresultadoslograr= $request ->inbresultadoslograr;
        $cl -> inbexplicanobjetivos= $request ->inbexplicanobjetivos;
        $cl -> inbinfquienresolver= $request ->inbinfquienresolver;
        $cl -> inbasiscapacitacion= $request ->inbasiscapacitacion;
        $cl -> inbrecibocapacitaci= $request ->inbrecibocapacitaci;
        $cl -> inbrecibocapaciayuda= $request ->inbrecibocapaciayuda;
        $cl -> inbjefeayudaorganiz= $request ->inbjefeayudaorganiz;
        $cl -> inbjefemispuntosvist= $request ->inbjefemispuntosvist;
        $cl -> inbjefeanima= $request ->inbjefeanima;
        $cl -> inbjefedistribuye= $request ->inbjefedistribuye;
        $cl -> inbjefecomunica= $request ->inbjefecomunica;
        $cl -> inbjefeorienracion= $request ->inbjefeorienracion;
        $cl -> inbjefeayudaprogres= $request ->inbjefeayudaprogres;
        $cl -> inbjefeayudasentime= $request ->inbjefeayudasentime;
        $cl -> inbjefesolucionar= $request ->inbjefesolucionar;
        $cl -> inbjeferespeto= $request ->inbjeferespeto;
        $cl -> inbjefeconfio= $request ->inbjefeconfio;
        $cl -> inbjefeescucha= $request ->inbjefeescucha;
        $cl -> inbjefeapoyo= $request ->inbjefeapoyo;
        $cl -> inbagradaambiente= $request ->inbagradaambiente;
        $cl -> inbgruporespeto= $request ->inbgruporespeto;
        $cl -> inbconfiocompaneros= $request ->inbconfiocompaneros;
        $cl -> inbagustocompaneros= $request ->inbagustocompaneros;
        $cl -> inbgrupomaltrata= $request ->inbgrupomaltrata;
        $cl -> inbsolucionacompa= $request ->inbsolucionacompa;
        $cl -> inbgrupounido= $request ->inbgrupounido;
        $cl -> inbtrabajogrupo= $request ->inbtrabajogrupo;
        $cl -> inbgrupodeacuerdo= $request ->inbgrupodeacuerdo;
        $cl -> inbgrupoayuda= $request ->inbgrupoayuda;
        $cl -> inbapoyounootros= $request ->inbapoyounootros;
        $cl -> inbescuchanproble= $request ->inbescuchanproble;
        $cl -> inbinfhagobien= $request ->inbinfhagobien;
        $cl -> inbinfmejorar= $request ->inbinfmejorar;
        $cl -> inbinfrendimiento= $request ->inbinfrendimiento;
        $cl -> inbevaluantrabajo= $request ->inbevaluantrabajo;
        $cl -> inbinfatiempomejora= $request ->inbinfatiempomejora;
        $cl -> inbemppaganatiempo= $request ->inbemppaganatiempo;
        $cl -> inbpagoofrecido= $request ->inbpagoofrecido;
        $cl -> inbpagomerezco= $request ->inbpagomerezco;
        $cl -> inbposibprogresar= $request ->inbposibprogresar;
        $cl -> inbhacerbienprog= $request ->inbhacerbienprog;
        $cl -> inbempbienestartrab= $request ->inbempbienestartrab;
        $cl -> inbtrabajoestable= $request ->inbtrabajoestable;
        $cl -> inbtrabsentirbien= $request ->inbtrabsentirbien;
        $cl -> inbsientoorgullo= $request ->inbsientoorgullo;
        $cl -> inbhablobienempres= $request ->inbhablobienempres;
        $cl -> inbatencionausuarios= $request ->inbatencionausuarios;
        $cl -> inbusuenojados= $request ->inbusuenojados;
        $cl -> inbusupreocupados= $request ->inbusupreocupados;
        $cl -> inbusutristes= $request ->inbusutristes;
        $cl -> inbusuenfermos= $request ->inbusuenfermos;
        $cl -> inbusuneceayuda= $request ->inbusuneceayuda;
        $cl -> inbusumemaltratan= $request ->inbusumemaltratan;
        $cl -> inbsituaviolencia= $request ->inbsituaviolencia;
        $cl -> inbexigedolorosas= $request ->inbexigedolorosas;
        $cl -> inbexpretristeza= $request ->inbexpretristeza; 


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
        $cl = formatoB::findOrfail($inaid);
        $cl -> delete();
    }
    
        public function buscarid($inaid)
    {
    $user = formatoB::where("inbidempleado","=",$inaid)->get();
       
        return  $user;
    }
    
    
    

        public function liderazgoRelacionesB($idEmp)
    {
        $result = DB::select('SELECT * FROM vw_liderazgo_relaciones_b where emdempresa = (?);',[$idEmp]);
        
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
            $total_liderazgo_b = $x->total_liderazgo_b;
            if($liderazgo == 0 or $liderazgo <= 3.8){
                $conteo0 = $conteo0 +1;
            }
            elseif($liderazgo == 3.9 or $liderazgo <= 13.5){
                $conteo1 = $conteo1 +1;
            }
            elseif($liderazgo == 13.6 or $liderazgo <= 25.0){
                $conteo2 = $conteo2 +1;
            }
            elseif($liderazgo == 25.1 or $liderazgo <= 38.5){
                $conteo3 = $conteo3 +1;
            }
            elseif($liderazgo == 38.6 or $liderazgo <= 100){
                $conteo4 = $conteo4 +1;
            }
         //
            if($relaciones == 0 or $relaciones <= 6.3){
                $conteo00 = $conteo00 +1;
            }
            elseif($relaciones == 6.4 or $relaciones <= 14.6){
                $conteo10 = $conteo10 +1;
            }
            elseif($relaciones == 14.7 or $relaciones <= 27.1){
                $conteo20 = $conteo20 +1;
            }
            elseif($relaciones == 27.2 or $relaciones <= 37.5){
                $conteo30 = $conteo30 +1;
            }
            elseif($relaciones == 37.6 or $relaciones <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //
            if($retroalimentacion == 0 or $retroalimentacion <= 5.0){
                $conteo01 = $conteo01 +1;
            }
            elseif($retroalimentacion == 5.1 or $retroalimentacion <= 20.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($retroalimentacion == 20.1 or $retroalimentacion <= 30){
                $conteo21 = $conteo21 +1;
            }
            elseif($retroalimentacion == 30.1 or $retroalimentacion <= 50.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($retroalimentacion == 50.1 or $retroalimentacion <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //no aplica
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
            
            //total_liderazgo_b
            if($total_liderazgo_b == 0 or $total_liderazgo_b <= 8.3){
                $conteo03 = $conteo03 +1;
            }
            elseif($total_liderazgo_b == 8.4 or $total_liderazgo_b <= 17.5){
                $conteo13 = $conteo13 +1;
            }
            elseif($total_liderazgo_b == 17.6 or $total_liderazgo_b <= 26.7){
                $conteo23 = $conteo23 +1;
            }
            elseif($total_liderazgo_b == 26.8 or $total_liderazgo_b <= 38.3){
                $conteo33 = $conteo33 +1;
            }
            elseif($total_liderazgo_b == 38.4 or $total_liderazgo_b <= 100){
                $conteo43 = $conteo43 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,0,0,0,0,0);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4);
        
        return $arrayFin;
    }
    
        public function controlSobreRolB($idEmp)
    { 
        $result = DB::select('SELECT * FROM vw_control_b where emdempresa = (?);',[$idEmp]);
        
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
            $total_control_b = $x -> total_control_b;
            //claridad
            if($claridad_rol == 0 or $claridad_rol <= 0.9){
                $conteo0 = $conteo0 +1;
            }
            elseif($claridad_rol == 1.0 or $claridad_rol <= 5.0){
                $conteo1 = $conteo1 +1;
            }
            elseif($claridad_rol == 5.1 or $claridad_rol <= 15.0){
                $conteo2 = $conteo2 +1;
            }
            elseif($claridad_rol == 15.1 or $claridad_rol <= 30.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($claridad_rol == 30.1 or $claridad_rol <= 100){
                $conteo4 = $conteo4 +1;
            }
         //capacitiacion
            if($capacitacion == 0 or $capacitacion <= 0.9){
                $conteo00 = $conteo00 +1;
            }
            elseif($capacitacion == 1.0 or $capacitacion <= 16.7){
                $conteo10 = $conteo10 +1;
            }
            elseif($capacitacion == 16.8 or $capacitacion <= 25.0){
                $conteo20 = $conteo20 +1;
            }
            elseif($capacitacion == 25.1 or $capacitacion <= 50.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($capacitacion == 51.0 or $capacitacion <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //manejo
            if($manejo_cambio == 0 or $manejo_cambio <= 16.7){
                $conteo01 = $conteo01 +1;
            }
            elseif($manejo_cambio == 16.8 or $manejo_cambio <= 33.3){
                $conteo11 = $conteo11 +1;
            }
            elseif($manejo_cambio == 33.4 or $manejo_cambio <= 41.7){
                $conteo21 = $conteo21 +1;
            }
            elseif($manejo_cambio == 41.8 or $manejo_cambio <= 58.3){
                $conteo31 = $conteo31 +1;
            }
            elseif($manejo_cambio == 58.4 or $manejo_cambio <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //oportunidad
            if($oportunidades == 0 or $oportunidades <= 12.5){
                $conteo02 = $conteo02 +1;
            }
            elseif($oportunidades == 12.6 or $oportunidades <= 25.0){
                $conteo12 = $conteo12 +1;
            }
            elseif($oportunidades == 25.1 or $oportunidades <= 37.5){
                $conteo22 = $conteo22 +1;
            }
            elseif($oportunidades == 37.6 or $oportunidades <= 56.3){
                $conteo32 = $conteo32 +1;
            }
            elseif($oportunidades == 56.4 or $oportunidades <= 100){
                $conteo42 = $conteo42 +1;
            }
            
              //control
            if($control_autonomia == 0 or $control_autonomia <= 33.3){
                $conteo03 = $conteo03 +1;
            }
            elseif($control_autonomia == 33.4 or $control_autonomia <= 50.0){
                $conteo13 = $conteo13 +1;
            }
            elseif($control_autonomia == 50.1 or $control_autonomia <= 66.7){
                $conteo23 = $conteo23 +1;
            }
            elseif($control_autonomia == 66.8 or $control_autonomia <= 75.0){
                $conteo33 = $conteo33 +1;
            }
            elseif($control_autonomia == 75.1 or $control_autonomia <= 100){
                $conteo43 = $conteo43 +1;
            }
            
            //total_control_b
            if($total_control_b == 0 or $total_control_b <= 19.4){
                $conteo04 = $conteo04 +1;
            }
            elseif($total_control_b == 19.5 or $total_control_b <= 26.4){
                $conteo14 = $conteo14 +1;
            }
            elseif($total_control_b == 26.5 or $total_control_b <= 34.7){
                $conteo24 = $conteo24 +1;
            }
            elseif($total_control_b == 34.8 or $total_control_b <= 43.1){
                $conteo34 = $conteo34 +1;
            }
            elseif($total_control_b == 43.2 or $total_control_b <= 100){
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
    
        public function DemandasTrabajoB($idEmp)
    { 
        $result = DB::select('SELECT * FROM vw_demanda_trabajo_b where emdempresa = (?);',[$idEmp]);
        
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
            $demandas_emocionales = $x->demandas_emocionales;
            $demandas_jornada = $x->demandas_jornada;
             $influ_extralaboral = $x->influ_extralaboral;
            $demandas_cuantitativas = $x->demandas_cuantitativas;
            $demandas_mental = $x->demandas_mental;
            $total_demantas_b = $x -> total_demantas_b;
            
            
            
            //demandas_ambientales
            if($demandas_ambientales == 0 or $demandas_ambientales <= 22.9){
                $conteo0 = $conteo0 +1;
            }
            elseif($demandas_ambientales == 23.0 or $demandas_ambientales <= 31.3){
                $conteo1 = $conteo1 +1;
            }
            elseif($demandas_ambientales == 31.4 or $demandas_ambientales <= 39.6){
                $conteo2 = $conteo2 +1;
            }
            elseif($demandas_ambientales == 39.7 or $demandas_ambientales <= 47.9){
                $conteo3 = $conteo3 +1;
            }
            elseif($demandas_ambientales == 48.0 or $demandas_ambientales <= 100){
                $conteo4 = $conteo4 +1;
            }
        
            
             //demandas_emocionales
            if($demandas_emocionales == 0 or $demandas_emocionales <= 19.4){
                $conteo02 = $conteo02 +1;
            }
            elseif($demandas_emocionales == 19.5 or $demandas_emocionales <= 27.8){
                $conteo12 = $conteo12 +1;
            }
            elseif($demandas_emocionales == 27.9 or $demandas_emocionales <= 38.9){
                $conteo22 = $conteo22 +1;
            }
            elseif($demandas_emocionales == 39.0 or $demandas_emocionales <= 47.2){
                $conteo32 = $conteo32 +1;
            }
            elseif($demandas_emocionales == 47.3 or $demandas_emocionales <= 100){
                $conteo42 = $conteo42 +1;
            }
            
              //demandas_jornada
            if($demandas_jornada == 0 or $demandas_jornada <= 25.0){
                $conteo03 = $conteo03 +1;
            }
            elseif($demandas_jornada == 25.1 or $demandas_jornada <= 37.5){
                $conteo13 = $conteo13 +1;
            }
            elseif($demandas_jornada == 37.6 or $demandas_jornada <= 45.8){
                $conteo23 = $conteo23 +1;
            }
            elseif($demandas_jornada == 45.9 or $demandas_jornada <= 58.3){
                $conteo33 = $conteo33 +1;
            }
            elseif($demandas_jornada == 58.4 or $demandas_jornada <= 100){
                $conteo43 = $conteo43 +1;
            }
            
              //$influ_extralaboral
            if($influ_extralaboral == 0 or $influ_extralaboral <= 12.5){
                $conteo04 = $conteo04 +1;
            }
            elseif($influ_extralaboral == 12.6 or $influ_extralaboral <= 25.0){
                $conteo14 = $conteo14 +1;
            }
            elseif($influ_extralaboral == 25.1 or $influ_extralaboral <= 31.3){
                $conteo24 = $conteo24 +1;
            }
            elseif($influ_extralaboral == 31.4 or $influ_extralaboral <= 50.0){
                $conteo34 = $conteo34 +1;
            }
            elseif($influ_extralaboral == 50.1 or $influ_extralaboral <= 100){
                $conteo44 = $conteo44 +1;
            }
            
               //demandas_cuantitativas
            if($demandas_cuantitativas == 0 or $demandas_cuantitativas <= 16.7){
                $conteo05 = $conteo05 +1;
            }
            elseif($demandas_cuantitativas == 16.8 or $demandas_cuantitativas <= 33.3){
                $conteo15 = $conteo15 +1;
            }
            elseif($demandas_cuantitativas == 33.4 or $demandas_cuantitativas <= 41.7){
                $conteo25 = $conteo25 +1;
            }
            elseif($demandas_cuantitativas == 41.8 or $demandas_cuantitativas <= 50.0){
                $conteo35 = $conteo35 +1;
            }
            elseif($demandas_cuantitativas == 50.1 or $demandas_cuantitativas <= 100){
                $conteo45 = $conteo45 +1;
            }
               //demandas_mental
            if($demandas_mental == 0 or $demandas_mental <= 50.0){
                $conteo06 = $conteo06 +1;
            }
            elseif($demandas_mental == 50.1 or $demandas_mental <= 65.0){
                $conteo16 = $conteo16 +1;
            }
            elseif($demandas_mental == 65.1 or $demandas_mental <= 75.0){
                $conteo26 = $conteo26 +1;
            }
            elseif($demandas_mental == 75.1 or $demandas_mental <= 85.0){
                $conteo36 = $conteo36 +1;
            }
            elseif($demandas_mental == 85.1 or $demandas_mental <= 100){
                $conteo46 = $conteo46 +1;
            }
            
            //$total_demandas_b
            if($total_demantas_b == 0 or $total_demantas_b <= 26.9){
                $conteo07 = $conteo07 +1;
            }
            elseif($total_demantas_b == 27.0 or $total_demantas_b <= 33.3){
                $conteo17 = $conteo17 +1;
            }
            elseif($total_demantas_b == 33.4 or $total_demantas_b <= 37.8){
                $conteo27 = $conteo27 +1;
            }
            elseif($total_demantas_b == 37.9 or $total_demantas_b <= 44.2){
                $conteo37 = $conteo37 +1;
            }
            elseif($total_demantas_b == 44.3 or $total_demantas_b <= 100){
                $conteo47 = $conteo47 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,0,0,0,0,0);
         array_push($array2,0,0,0,0,0);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($array5,$conteo04,$conteo14,$conteo24,$conteo34,$conteo44);
         array_push($array6,$conteo05,$conteo15,$conteo25,$conteo35,$conteo45);
         array_push($array7,$conteo06,$conteo16,$conteo26,$conteo36,$conteo46);
         array_push($array8,$conteo07,$conteo17,$conteo27,$conteo37,$conteo47);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4,$array5,$array6,$array7,$array8);
        
        return $arrayFin;
    }
    
        public function recompensasB($idEmp)
    {
        $result = DB::select('SELECT * FROM vw_recompensa_b where emdempresa = (?);',[$idEmp]);
        
        
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
            elseif($recompensas_trabajo == 1.0 or $recompensas_trabajo <= 6.3){
                $conteo1 = $conteo1 +1;
            }
            elseif($recompensas_trabajo == 6.4 or $recompensas_trabajo <= 12.5){
                $conteo2 = $conteo2 +1;
            }
            elseif($recompensas_trabajo == 12.6 or $recompensas_trabajo <= 18.8){
                $conteo3 = $conteo3 +1;
            }
            elseif($recompensas_trabajo == 18.9 or $recompensas_trabajo <= 100){
                $conteo4 = $conteo4 +1;
            }
         //
            if($reconocimiento == 0 or $reconocimiento <= 0.9){
                $conteo00 = $conteo00 +1;
            }
            elseif($reconocimiento ==1.0 or $reconocimiento <= 12.5){
                $conteo10 = $conteo10 +1;
            }
            elseif($reconocimiento == 12.6 or $reconocimiento <= 25){
                $conteo20 = $conteo20 +1;
            }
            elseif($reconocimiento == 25.1 or $reconocimiento <= 37.5){
                $conteo30 = $conteo30 +1;
            }
            elseif($reconocimiento == 37.6 or $reconocimiento <= 100){
                $conteo40 = $conteo40 +1;
            }
            
            //total_recompensa
            if($total_recompensa == 0 or $total_recompensa <= 2.5){
                $conteo01 = $conteo01 +1;
            }
            elseif($total_recompensa == 2.6 or $total_recompensa <= 10.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($total_recompensa == 10.1 or $total_recompensa <= 17.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($total_recompensa == 17.6 or $total_recompensa <= 27.5){
                $conteo31 = $conteo31 +1;
            }
            elseif($total_recompensa == 27.6 or $total_recompensa <= 100){
                $conteo41 = $conteo41 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($arrayFin,$array,$array1,$array2);
        
        return $arrayFin;
    }
    
    public function liderazgoRelacionesBByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_liderazgo_relaciones_b where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
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
            $total_liderazgo_b = $x->total_liderazgo_b;
            if($liderazgo == 0 or $liderazgo <= 3.8){
                $conteo0 = $conteo0 +1;
            }
            elseif($liderazgo == 3.9 or $liderazgo <= 13.5){
                $conteo1 = $conteo1 +1;
            }
            elseif($liderazgo == 13.6 or $liderazgo <= 25.0){
                $conteo2 = $conteo2 +1;
            }
            elseif($liderazgo == 25.1 or $liderazgo <= 38.5){
                $conteo3 = $conteo3 +1;
            }
            elseif($liderazgo == 38.6 or $liderazgo <= 100){
                $conteo4 = $conteo4 +1;
            }
         //
            if($relaciones == 0 or $relaciones <= 6.3){
                $conteo00 = $conteo00 +1;
            }
            elseif($relaciones == 6.4 or $relaciones <= 14.6){
                $conteo10 = $conteo10 +1;
            }
            elseif($relaciones == 14.7 or $relaciones <= 27.1){
                $conteo20 = $conteo20 +1;
            }
            elseif($relaciones == 27.2 or $relaciones <= 37.5){
                $conteo30 = $conteo30 +1;
            }
            elseif($relaciones == 37.6 or $relaciones <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //
            if($retroalimentacion == 0 or $retroalimentacion <= 5.0){
                $conteo01 = $conteo01 +1;
            }
            elseif($retroalimentacion == 5.1 or $retroalimentacion <= 20.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($retroalimentacion == 20.1 or $retroalimentacion <= 30){
                $conteo21 = $conteo21 +1;
            }
            elseif($retroalimentacion == 30.1 or $retroalimentacion <= 50.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($retroalimentacion == 50.1 or $retroalimentacion <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //no aplica
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
            
            //total_liderazgo_b
            if($total_liderazgo_b == 0 or $total_liderazgo_b <= 8.3){
                $conteo03 = $conteo03 +1;
            }
            elseif($total_liderazgo_b == 8.4 or $total_liderazgo_b <= 17.5){
                $conteo13 = $conteo13 +1;
            }
            elseif($total_liderazgo_b == 17.6 or $total_liderazgo_b <= 26.7){
                $conteo23 = $conteo23 +1;
            }
            elseif($total_liderazgo_b == 26.8 or $total_liderazgo_b <= 38.3){
                $conteo33 = $conteo33 +1;
            }
            elseif($total_liderazgo_b == 38.4 or $total_liderazgo_b <= 100){
                $conteo43 = $conteo43 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,0,0,0,0,0);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4);
        
        return $arrayFin;
    }
    
    public function controlSobreRolBByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_control_b where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
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
            $total_control_b = $x -> total_control_b;
            //claridad
            if($claridad_rol == 0 or $claridad_rol <= 0.9){
                $conteo0 = $conteo0 +1;
            }
            elseif($claridad_rol == 1.0 or $claridad_rol <= 5.0){
                $conteo1 = $conteo1 +1;
            }
            elseif($claridad_rol == 5.1 or $claridad_rol <= 15.0){
                $conteo2 = $conteo2 +1;
            }
            elseif($claridad_rol == 15.1 or $claridad_rol <= 30.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($claridad_rol == 30.1 or $claridad_rol <= 100){
                $conteo4 = $conteo4 +1;
            }
         //capacitiacion
            if($capacitacion == 0 or $capacitacion <= 0.9){
                $conteo00 = $conteo00 +1;
            }
            elseif($capacitacion == 1.0 or $capacitacion <= 16.7){
                $conteo10 = $conteo10 +1;
            }
            elseif($capacitacion == 16.8 or $capacitacion <= 25.0){
                $conteo20 = $conteo20 +1;
            }
            elseif($capacitacion == 25.1 or $capacitacion <= 50.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($capacitacion == 51.0 or $capacitacion <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //manejo
            if($manejo_cambio == 0 or $manejo_cambio <= 16.7){
                $conteo01 = $conteo01 +1;
            }
            elseif($manejo_cambio == 16.8 or $manejo_cambio <= 33.3){
                $conteo11 = $conteo11 +1;
            }
            elseif($manejo_cambio == 33.4 or $manejo_cambio <= 41.7){
                $conteo21 = $conteo21 +1;
            }
            elseif($manejo_cambio == 41.8 or $manejo_cambio <= 58.3){
                $conteo31 = $conteo31 +1;
            }
            elseif($manejo_cambio == 58.4 or $manejo_cambio <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //oportunidad
            if($oportunidades == 0 or $oportunidades <= 12.5){
                $conteo02 = $conteo02 +1;
            }
            elseif($oportunidades == 12.6 or $oportunidades <= 25.0){
                $conteo12 = $conteo12 +1;
            }
            elseif($oportunidades == 25.1 or $oportunidades <= 37.5){
                $conteo22 = $conteo22 +1;
            }
            elseif($oportunidades == 37.6 or $oportunidades <= 56.3){
                $conteo32 = $conteo32 +1;
            }
            elseif($oportunidades == 56.4 or $oportunidades <= 100){
                $conteo42 = $conteo42 +1;
            }
            
              //control
            if($control_autonomia == 0 or $control_autonomia <= 33.3){
                $conteo03 = $conteo03 +1;
            }
            elseif($control_autonomia == 33.4 or $control_autonomia <= 50.0){
                $conteo13 = $conteo13 +1;
            }
            elseif($control_autonomia == 50.1 or $control_autonomia <= 66.7){
                $conteo23 = $conteo23 +1;
            }
            elseif($control_autonomia == 66.8 or $control_autonomia <= 75.0){
                $conteo33 = $conteo33 +1;
            }
            elseif($control_autonomia == 75.1 or $control_autonomia <= 100){
                $conteo43 = $conteo43 +1;
            }
            
            //total_control_b
            if($total_control_b == 0 or $total_control_b <= 19.4){
                $conteo04 = $conteo04 +1;
            }
            elseif($total_control_b == 19.5 or $total_control_b <= 26.4){
                $conteo14 = $conteo14 +1;
            }
            elseif($total_control_b == 26.5 or $total_control_b <= 34.7){
                $conteo24 = $conteo24 +1;
            }
            elseif($total_control_b == 34.8 or $total_control_b <= 43.1){
                $conteo34 = $conteo34 +1;
            }
            elseif($total_control_b == 43.2 or $total_control_b <= 100){
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
    
    public function DemandasTrabajoBByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_demanda_trabajo_b where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
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
            $demandas_emocionales = $x->demandas_emocionales;
            $demandas_jornada = $x->demandas_jornada;
             $influ_extralaboral = $x->influ_extralaboral;
            $demandas_cuantitativas = $x->demandas_cuantitativas;
            $demandas_mental = $x->demandas_mental;
            $total_demantas_b = $x -> total_demantas_b;
            
            
            
            //demandas_ambientales
            if($demandas_ambientales == 0 or $demandas_ambientales <= 22.9){
                $conteo0 = $conteo0 +1;
            }
            elseif($demandas_ambientales == 23.0 or $demandas_ambientales <= 31.3){
                $conteo1 = $conteo1 +1;
            }
            elseif($demandas_ambientales == 31.4 or $demandas_ambientales <= 39.6){
                $conteo2 = $conteo2 +1;
            }
            elseif($demandas_ambientales == 39.7 or $demandas_ambientales <= 47.9){
                $conteo3 = $conteo3 +1;
            }
            elseif($demandas_ambientales == 48.0 or $demandas_ambientales <= 100){
                $conteo4 = $conteo4 +1;
            }
        
            
             //demandas_emocionales
            if($demandas_emocionales == 0 or $demandas_emocionales <= 19.4){
                $conteo02 = $conteo02 +1;
            }
            elseif($demandas_emocionales == 19.5 or $demandas_emocionales <= 27.8){
                $conteo12 = $conteo12 +1;
            }
            elseif($demandas_emocionales == 27.9 or $demandas_emocionales <= 38.9){
                $conteo22 = $conteo22 +1;
            }
            elseif($demandas_emocionales == 39.0 or $demandas_emocionales <= 47.2){
                $conteo32 = $conteo32 +1;
            }
            elseif($demandas_emocionales == 47.3 or $demandas_emocionales <= 100){
                $conteo42 = $conteo42 +1;
            }
            
              //demandas_jornada
            if($demandas_jornada == 0 or $demandas_jornada <= 25.0){
                $conteo03 = $conteo03 +1;
            }
            elseif($demandas_jornada == 25.1 or $demandas_jornada <= 37.5){
                $conteo13 = $conteo13 +1;
            }
            elseif($demandas_jornada == 37.6 or $demandas_jornada <= 45.8){
                $conteo23 = $conteo23 +1;
            }
            elseif($demandas_jornada == 45.9 or $demandas_jornada <= 58.3){
                $conteo33 = $conteo33 +1;
            }
            elseif($demandas_jornada == 58.4 or $demandas_jornada <= 100){
                $conteo43 = $conteo43 +1;
            }
            
              //$influ_extralaboral
            if($influ_extralaboral == 0 or $influ_extralaboral <= 12.5){
                $conteo04 = $conteo04 +1;
            }
            elseif($influ_extralaboral == 12.6 or $influ_extralaboral <= 25.0){
                $conteo14 = $conteo14 +1;
            }
            elseif($influ_extralaboral == 25.1 or $influ_extralaboral <= 31.3){
                $conteo24 = $conteo24 +1;
            }
            elseif($influ_extralaboral == 31.4 or $influ_extralaboral <= 50.0){
                $conteo34 = $conteo34 +1;
            }
            elseif($influ_extralaboral == 50.1 or $influ_extralaboral <= 100){
                $conteo44 = $conteo44 +1;
            }
            
               //demandas_cuantitativas
            if($demandas_cuantitativas == 0 or $demandas_cuantitativas <= 16.7){
                $conteo05 = $conteo05 +1;
            }
            elseif($demandas_cuantitativas == 16.8 or $demandas_cuantitativas <= 33.3){
                $conteo15 = $conteo15 +1;
            }
            elseif($demandas_cuantitativas == 33.4 or $demandas_cuantitativas <= 41.7){
                $conteo25 = $conteo25 +1;
            }
            elseif($demandas_cuantitativas == 41.8 or $demandas_cuantitativas <= 50.0){
                $conteo35 = $conteo35 +1;
            }
            elseif($demandas_cuantitativas == 50.1 or $demandas_cuantitativas <= 100){
                $conteo45 = $conteo45 +1;
            }
               //demandas_mental
            if($demandas_mental == 0 or $demandas_mental <= 50.0){
                $conteo06 = $conteo06 +1;
            }
            elseif($demandas_mental == 50.1 or $demandas_mental <= 65.0){
                $conteo16 = $conteo16 +1;
            }
            elseif($demandas_mental == 65.1 or $demandas_mental <= 75.0){
                $conteo26 = $conteo26 +1;
            }
            elseif($demandas_mental == 75.1 or $demandas_mental <= 85.0){
                $conteo36 = $conteo36 +1;
            }
            elseif($demandas_mental == 85.1 or $demandas_mental <= 100){
                $conteo46 = $conteo46 +1;
            }
            
            //$total_demandas_b
            if($total_demantas_b == 0 or $total_demantas_b <= 26.9){
                $conteo07 = $conteo07 +1;
            }
            elseif($total_demantas_b == 27.0 or $total_demantas_b <= 33.3){
                $conteo17 = $conteo17 +1;
            }
            elseif($total_demantas_b == 33.4 or $total_demantas_b <= 37.8){
                $conteo27 = $conteo27 +1;
            }
            elseif($total_demantas_b == 37.9 or $total_demantas_b <= 44.2){
                $conteo37 = $conteo37 +1;
            }
            elseif($total_demantas_b == 44.3 or $total_demantas_b <= 100){
                $conteo47 = $conteo47 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,0,0,0,0,0);
         array_push($array2,0,0,0,0,0);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($array4,$conteo03,$conteo13,$conteo23,$conteo33,$conteo43);
         array_push($array5,$conteo04,$conteo14,$conteo24,$conteo34,$conteo44);
         array_push($array6,$conteo05,$conteo15,$conteo25,$conteo35,$conteo45);
         array_push($array7,$conteo06,$conteo16,$conteo26,$conteo36,$conteo46);
         array_push($array8,$conteo07,$conteo17,$conteo27,$conteo37,$conteo47);
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4,$array5,$array6,$array7,$array8);
        
        return $arrayFin;
    }
    
    public function recompensasBByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_recompensa_b where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
        
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
            elseif($recompensas_trabajo == 1.0 or $recompensas_trabajo <= 6.3){
                $conteo1 = $conteo1 +1;
            }
            elseif($recompensas_trabajo == 6.4 or $recompensas_trabajo <= 12.5){
                $conteo2 = $conteo2 +1;
            }
            elseif($recompensas_trabajo == 12.6 or $recompensas_trabajo <= 18.8){
                $conteo3 = $conteo3 +1;
            }
            elseif($recompensas_trabajo == 18.9 or $recompensas_trabajo <= 100){
                $conteo4 = $conteo4 +1;
            }
         //
            if($reconocimiento == 0 or $reconocimiento <= 0.9){
                $conteo00 = $conteo00 +1;
            }
            elseif($reconocimiento ==1.0 or $reconocimiento <= 12.5){
                $conteo10 = $conteo10 +1;
            }
            elseif($reconocimiento == 12.6 or $reconocimiento <= 25){
                $conteo20 = $conteo20 +1;
            }
            elseif($reconocimiento == 25.1 or $reconocimiento <= 37.5){
                $conteo30 = $conteo30 +1;
            }
            elseif($reconocimiento == 37.6 or $reconocimiento <= 100){
                $conteo40 = $conteo40 +1;
            }
            
            //total_recompensa
            if($total_recompensa == 0 or $total_recompensa <= 2.5){
                $conteo01 = $conteo01 +1;
            }
            elseif($total_recompensa == 2.6 or $total_recompensa <= 10.0){
                $conteo11 = $conteo11 +1;
            }
            elseif($total_recompensa == 10.1 or $total_recompensa <= 17.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($total_recompensa == 17.6 or $total_recompensa <= 27.5){
                $conteo31 = $conteo31 +1;
            }
            elseif($total_recompensa == 27.6 or $total_recompensa <= 100){
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