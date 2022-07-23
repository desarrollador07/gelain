<?php

namespace App\Http\Controllers;
use App\Models\estres;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class estresController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return estres::all();
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
        return estres::create($request->all());
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
    public function update(Request $request, $estid)
    {
        $cl = estres::findOrfail($estid);
        $cl -> estidempleado= $request ->estidempleado;
        $cl -> estdolorcuello= $request ->estdolorcuello;
        $cl -> estprobgastrico= $request ->estprobgastrico;
        $cl -> estprobrespira= $request ->estprobrespira;
        $cl -> estdolorcabeza= $request ->estdolorcabeza;
        $cl -> esttrastsueno= $request ->esttrastsueno;
        $cl -> estpalpitacion= $request ->estpalpitacion;
        $cl -> estcamapetito= $request ->estcamapetito;
        $cl -> estprobgenital= $request ->estprobgenital;
        $cl -> estdiffamiliar= $request ->estdiffamiliar;
        $cl -> estdifquieto= $request ->estdifquieto;
        $cl -> estdifpersonas= $request ->estdifpersonas;
        $cl -> estsensaislami= $request ->estsensaislami;
        $cl -> estsobrecarga= $request ->estsobrecarga;
        $cl -> estdifconcentrar= $request ->estdifconcentrar;
        $cl -> estaumentaccid= $request ->estaumentaccid;
        $cl -> estsentfrustra= $request ->estsentfrustra;
        $cl -> estcansancio= $request ->estcansancio;
        $cl -> estdismrendimie= $request ->estdismrendimie;
        $cl -> estdeseonotrab= $request ->estdeseonotrab;
        $cl -> estpocointeres= $request ->estpocointeres;
        $cl -> estdifdecisiones= $request ->estdifdecisiones;
        $cl -> estcambioempleo= $request ->estcambioempleo;
        $cl -> estsentisoledad= $request ->estsentisoledad;
        $cl -> estsentinegativo= $request ->estsentinegativo;
        $cl -> estsetangpretris= $request ->estsetangpretris;
        $cl -> estconsdrogas= $request ->estconsdrogas;
        $cl -> estsentinosirve= $request ->estsentinosirve;
        $cl -> estconsucigarri= $request ->estconsucigarri;
        $cl -> estperdirazon= $request ->estperdirazon;
        $cl -> estcomprigido= $request ->estcomprigido;
        $cl -> estsensproblem= $request ->estsensproblem;
       // $cl -> estfechareg= $request ->estfechareg;
       // $cl -> estfechamod= $request ->estfechamod;
        $cl -> estusuarioreg= $request ->estusuarioreg;


        $cl -> update();
        return $cl;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($estid)
    {
        $cl = estres::findOrfail($estid);
        $cl -> delete();
    }

    public function buscarid($estid)
    {
    $user = estres::where("estidempleado","=",$estid)->get();
       
        return  $user;
    }
    
    public function ESTRES($idEmp)
    { 
        $result = DB::select('SELECT * FROM vw_estres  where emdempresa = (?);',[$idEmp]);
        
        $array = array();
        $arraytotal = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;

        
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $total_estres = $x->total_estres;
            
             //fisiologicas
            if($total_estres == 0 or $total_estres <= 7.8){
                $conteo0 = $conteo0 +1;
            }
            elseif($total_estres == 7.9 or $total_estres <= 12.6){
                $conteo1 = $conteo1 +1;
            }
            elseif($total_estres == 12.7 or $total_estres <= 17.7){
                $conteo2 = $conteo2 +1;
            }
            elseif($total_estres == 17.8 or $total_estres <= 25.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($total_estres == 25.1 or $total_estres <= 100){
                $conteo4 = $conteo4 +1;
            }
           
            
        }
        array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);

         array_push($arrayFin,$array);
        
        return $arrayFin;
    }
    
    public function ESTRES_DETALLES($idEmp)
    { 
        $result = DB::select('SELECT * FROM vw_estres_detalle  where emdempresa = (?);',[$idEmp]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $array5 = array();
        $array6 = array();
        $array7 = array();
        $arraytotal = array();
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
        
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $fisiologicas = $x->fisiologicas;
            $compor_social = $x->compor_social;
            $intel_labora = $x->intel_labora;
            $psicoemocionales = $x->psicoemocionales;

            
            //fisiologicas
            if($fisiologicas == 0 or $fisiologicas <= 7.8){
                $conteo0 = $conteo0 +1;
            }
            elseif($fisiologicas == 7.9 or $fisiologicas <= 12.6){
                $conteo1 = $conteo1 +1;
            }
            elseif($fisiologicas == 12.7 or $fisiologicas <= 17.7){
                $conteo2 = $conteo2 +1;
            }
            elseif($fisiologicas == 17.8 or $fisiologicas <= 25.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($fisiologicas == 25.1 or $fisiologicas <= 100){
                $conteo4 = $conteo4 +1;
            }
         //compor_social
            if($compor_social == 0 or $compor_social <= 7.8){
                $conteo00 = $conteo00 +1;
            }
            elseif($compor_social == 7.9 or $compor_social <= 12.6){
                $conteo10 = $conteo10 +1;
            }
            elseif($compor_social == 12.7 or $compor_social <= 17.7){
                $conteo20 = $conteo20 +1;
            }
            elseif($compor_social == 17.8 or $compor_social <= 25.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($compor_social == 25.1 or $compor_social <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //intel_labora
            if($intel_labora == 0 or $intel_labora <= 7.8){
                $conteo01 = $conteo01 +1;
            }
            elseif($intel_labora == 7.9 or $intel_labora <= 12.6){
                $conteo11 = $conteo11 +1;
            }
            elseif($intel_labora == 12.7 or $intel_labora <= 17.7){
                $conteo21 = $conteo21 +1;
            }
            elseif($intel_labora == 17.8 or $intel_labora <= 25.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($intel_labora == 25.1 or $intel_labora <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //psicoemocionales
            if($psicoemocionales == 0 or $psicoemocionales <= 7.8){
                $conteo02 = $conteo02 +1;
            }
            elseif($psicoemocionales == 7.9 or $psicoemocionales <= 12.6){
                $conteo12 = $conteo12 +1;
            }
            elseif($psicoemocionales == 12.7 or $psicoemocionales <= 17.7){
                $conteo22 = $conteo22 +1;
            }
            elseif($psicoemocionales == 17.8 or $psicoemocionales <= 25.0){
                $conteo32 = $conteo32 +1;
            }
            elseif($psicoemocionales == 25.1 or $psicoemocionales <= 100){
                $conteo42 = $conteo42 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($arrayFin,$array,$array1,$array2,$array3);
        
        return $arrayFin;
    }
    
    public function ESTRES_DETALLESByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_estres_detalle  where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
        $array = array();
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        $array5 = array();
        $array6 = array();
        $array7 = array();
        $arraytotal = array();
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
        
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $fisiologicas = $x->fisiologicas;
            $compor_social = $x->compor_social;
            $intel_labora = $x->intel_labora;
            $psicoemocionales = $x->psicoemocionales;

            
            //fisiologicas
            if($fisiologicas == 0 or $fisiologicas <= 7.8){
                $conteo0 = $conteo0 +1;
            }
            elseif($fisiologicas == 7.9 or $fisiologicas <= 12.6){
                $conteo1 = $conteo1 +1;
            }
            elseif($fisiologicas == 12.7 or $fisiologicas <= 17.7){
                $conteo2 = $conteo2 +1;
            }
            elseif($fisiologicas == 17.8 or $fisiologicas <= 25.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($fisiologicas == 25.1 or $fisiologicas <= 100){
                $conteo4 = $conteo4 +1;
            }
         //compor_social
            if($compor_social == 0 or $compor_social <= 7.8){
                $conteo00 = $conteo00 +1;
            }
            elseif($compor_social == 7.9 or $compor_social <= 12.6){
                $conteo10 = $conteo10 +1;
            }
            elseif($compor_social == 12.7 or $compor_social <= 17.7){
                $conteo20 = $conteo20 +1;
            }
            elseif($compor_social == 17.8 or $compor_social <= 25.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($compor_social == 25.1 or $compor_social <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //intel_labora
            if($intel_labora == 0 or $intel_labora <= 7.8){
                $conteo01 = $conteo01 +1;
            }
            elseif($intel_labora == 7.9 or $intel_labora <= 12.6){
                $conteo11 = $conteo11 +1;
            }
            elseif($intel_labora == 12.7 or $intel_labora <= 17.7){
                $conteo21 = $conteo21 +1;
            }
            elseif($intel_labora == 17.8 or $intel_labora <= 25.0){
                $conteo31 = $conteo31 +1;
            }
            elseif($intel_labora == 25.1 or $intel_labora <= 100){
                $conteo41 = $conteo41 +1;
            }
            
             //psicoemocionales
            if($psicoemocionales == 0 or $psicoemocionales <= 7.8){
                $conteo02 = $conteo02 +1;
            }
            elseif($psicoemocionales == 7.9 or $psicoemocionales <= 12.6){
                $conteo12 = $conteo12 +1;
            }
            elseif($psicoemocionales == 12.7 or $psicoemocionales <= 17.7){
                $conteo22 = $conteo22 +1;
            }
            elseif($psicoemocionales == 17.8 or $psicoemocionales <= 25.0){
                $conteo32 = $conteo32 +1;
            }
            elseif($psicoemocionales == 25.1 or $psicoemocionales <= 100){
                $conteo42 = $conteo42 +1;
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($array3,$conteo02,$conteo12,$conteo22,$conteo32,$conteo42);
         array_push($arrayFin,$array,$array1,$array2,$array3);
        
        return $arrayFin;
    }
    
    public function ESTRESByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_estres  where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
        $array = array();
        $arraytotal = array();
        $arrayFin = array();
        $conteo0 = 0;
        $conteo1 = 0;
        $conteo2 = 0;
        $conteo3 = 0;
        $conteo4 = 0;

        
         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $total_estres = $x->total_estres;
            
             //fisiologicas
            if($total_estres == 0 or $total_estres <= 7.8){
                $conteo0 = $conteo0 +1;
            }
            elseif($total_estres == 7.9 or $total_estres <= 12.6){
                $conteo1 = $conteo1 +1;
            }
            elseif($total_estres == 12.7 or $total_estres <= 17.7){
                $conteo2 = $conteo2 +1;
            }
            elseif($total_estres == 17.8 or $total_estres <= 25.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($total_estres == 25.1 or $total_estres <= 100){
                $conteo4 = $conteo4 +1;
            }
           
            
        }
        array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);

         array_push($arrayFin,$array);
        
        return $arrayFin;
    }
}
