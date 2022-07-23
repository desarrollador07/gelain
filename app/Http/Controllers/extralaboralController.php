<?php

namespace App\Http\Controllers;
use App\Models\extralaboral;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
class extralaboralController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return extralaboral::all();
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
        return extralaboral::create($request->all());
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
    public function update(Request $request, $extid)
    {
        $cl = extralaboral::findOrfail($extid);
        $cl -> extidempleado= $request ->extidempleado;
        $cl -> extfaciltransporte= $request ->extfaciltransporte;
        $cl -> extvariostransporte= $request ->extvariostransporte;
        $cl -> extmuchotiemviaje= $request ->extmuchotiemviaje;
        $cl -> exttranscomodo= $request ->exttranscomodo;
        $cl -> extzonasegura= $request ->extzonasegura;
        $cl -> extzonadelincuencia= $request ->extzonadelincuencia;
        $cl -> extfacilcmedico= $request ->extfacilcmedico;
        $cl -> extbuenasvias= $request ->extbuenasvias;
        $cl -> extcercatransporte= $request ->extcercatransporte;
        $cl -> extcondicvivienda= $request ->extcondicvivienda;
        $cl -> extagualuz= $request ->extagualuz;
        $cl -> extpermdescanzar= $request ->extpermdescanzar;
        $cl -> extviviendacomoda= $request ->extviviendacomoda;
        $cl -> exttiemporecreo= $request ->exttiemporecreo;
        $cl -> exttiempodescanzo= $request ->exttiempodescanzo;
        $cl -> exttiempopersonal= $request ->exttiempopersonal;
        $cl -> exttiempofamilia= $request ->exttiempofamilia;
        $cl -> extbuenacomunica= $request ->extbuenacomunica;
        $cl -> extrelacionamigos= $request ->extrelacionamigos;
        $cl -> extconversoperson= $request ->extconversoperson;
        $cl -> extamigosescuchan= $request ->extamigosescuchan;
        $cl -> extapoyofamiliar= $request ->extapoyofamiliar;
        $cl -> exthabloconperso= $request ->exthabloconperso;
        $cl -> extproblemfamiliar= $request ->extproblemfamiliar;
        $cl -> extrelacionfamiliar= $request ->extrelacionfamiliar;
        $cl -> extquitanenergia= $request ->extquitanenergia;
        $cl -> extresolveamistosa= $request ->extresolveamistosa;
        $cl -> extafectrelacionestra= $request ->extafectrelacionestra;
        $cl -> extdineroalcanza= $request ->extdineroalcanza;
        $cl -> extpresupuesfamilia= $request ->extpresupuesfamilia;
        $cl -> extdeudashogar= $request ->extdeudashogar;
       // $cl -> extfechareg= $request ->extfechareg;
       // $cl -> extfechamod= $request ->extfechamod;
        $cl -> extusuarioreg= $request ->extusuarioreg;


        $cl -> update();
        return $cl;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($extid)
    {
        $cl = extralaboral::findOrfail($extid);
        $cl -> delete();
    }
    public function buscarid($extid)
    {
    $user = extralaboral::where("extidempleado","=",$extid)->get();
       
        return  $user;
    }
    
    public function PSICOSOCIAL_EXTRALABORAL($idEmp)
    { 
        $result = DB::select('SELECT * FROM vw_extralaboral  where emdempresa = (?);',[$idEmp]);
        
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
            $tiempo_fuera = $x->tiempo_fuera;
			$formato= $x->formato;
            $relaciones_familiares = $x->relaciones_familiares;
            $com_relaciones_interperson = $x->com_relaciones_interperson;
            $situacion_económica = $x->situacion_económica;
            $caract_vivienda = $x->caract_vivienda;
             $influencia_extralaboral = $x->influencia_extralaboral;
            $desplaz_vivienda = $x->desplaz_vivienda;
            $total_extralaboral = $x->total_extralaboral;
            
          
            
            //tiempo_fuera
            if($tiempo_fuera == 0 or $tiempo_fuera <= 6.3){
                $conteo0 = $conteo0 +1;
            }
            elseif($tiempo_fuera == 6.4 or $tiempo_fuera <= 25.0){
                $conteo1 = $conteo1 +1;
            }
            elseif($tiempo_fuera == 25.1 or $tiempo_fuera <= 37.5){
                $conteo2 = $conteo2 +1;
            }
            elseif($tiempo_fuera == 37.6 or $tiempo_fuera <= 50.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($tiempo_fuera == 50.1 or $tiempo_fuera <= 100){
                $conteo4 = $conteo4 +1;
            }
         //relaciones_familiares
            if($relaciones_familiares == 0 or $relaciones_familiares <= 8.3){
                $conteo00 = $conteo00 +1;
            }
            elseif($relaciones_familiares == 8.4 or $relaciones_familiares <= 25.0){
                $conteo10 = $conteo10 +1;
            }
            elseif($relaciones_familiares == 25.1 or $relaciones_familiares <= 33.3){
                $conteo20 = $conteo20 +1;
            }
            elseif($relaciones_familiares == 33.4 or $relaciones_familiares <= 50.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($relaciones_familiares == 50.1 or $relaciones_familiares <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //com_relaciones_interperson
			 if($formato=='A'){ 
				if($com_relaciones_interperson == 0 or $com_relaciones_interperson <= 0.9){
					$conteo01 = $conteo01 +1;
				}
				elseif($com_relaciones_interperson == 1.0 or $com_relaciones_interperson <= 10.0){
					$conteo11 = $conteo11 +1;
				}
				elseif($com_relaciones_interperson == 10.1 or $com_relaciones_interperson <= 20.0){
					$conteo21 = $conteo21 +1;
				}
				elseif($com_relaciones_interperson == 20.1 or $com_relaciones_interperson <= 30.0){
					$conteo31 = $conteo31 +1;
				}
				elseif($com_relaciones_interperson == 30.1 or $com_relaciones_interperson <= 100){
					$conteo41 = $conteo41 +1;
				}
            }else{
				if($com_relaciones_interperson == 0 or $com_relaciones_interperson <= 5.0){
					$conteo01 = $conteo01 +1;
				}
				elseif($com_relaciones_interperson == 5.1 or $com_relaciones_interperson <= 15.0){
					$conteo11 = $conteo11 +1;
				}
				elseif($com_relaciones_interperson == 15.1 or $com_relaciones_interperson <= 25.0){
					$conteo21 = $conteo21 +1;
				}
				elseif($com_relaciones_interperson == 25.1 or $com_relaciones_interperson <= 35.0){
					$conteo31 = $conteo31 +1;
				}
				elseif($com_relaciones_interperson == 35.1 or $com_relaciones_interperson <= 100){
					$conteo41 = $conteo41 +1;
				}	
			}
             //situacion_económica
			 if($formato=='A'){  
				if($situacion_económica == 0 or $situacion_económica <= 8.3){
					$conteo02 = $conteo02 +1;
				}
				elseif($situacion_económica == 8.4 or $situacion_económica <= 25.0){
					$conteo12 = $conteo12 +1;
				}
				elseif($situacion_económica == 25.1 or $situacion_económica <= 33.3){
					$conteo22 = $conteo22 +1;
				}
				elseif($situacion_económica == 33.4 or $situacion_económica <= 50.0){
					$conteo32 = $conteo32 +1;
				}
				elseif($situacion_económica == 50.1 or $situacion_económica <= 100){
					$conteo42 = $conteo42 +1;
				}
            }else{
				if($situacion_económica == 0 or $situacion_económica <= 16.7){
					$conteo02 = $conteo02 +1;
				}
				elseif($situacion_económica == 16.8 or $situacion_económica <= 25.0){
					$conteo12 = $conteo12 +1;
				}
				elseif($situacion_económica == 25.1 or $situacion_económica <= 41.7){
					$conteo22 = $conteo22 +1;
				}
				elseif($situacion_económica == 41.8 or $situacion_económica <= 50.0){
					$conteo32 = $conteo32 +1;
				}
				elseif($situacion_económica == 50.1 or $situacion_económica <= 100){
					$conteo42 = $conteo42 +1;
				}

			}
              //caract_vivienda
			if($formato=='A'){  	
				if($caract_vivienda == 0 or $caract_vivienda <= 5.6){
					$conteo03 = $conteo03 +1;
				}
				elseif($caract_vivienda == 5.7 or $caract_vivienda <= 11.1){
					$conteo13 = $conteo13 +1;
				}
				elseif($caract_vivienda == 11.2 or $caract_vivienda <= 13.9){
					$conteo23 = $conteo23 +1;
				}
				elseif($caract_vivienda == 14.0 or $caract_vivienda <= 22.2){
					$conteo33 = $conteo33 +1;
				}
				elseif($caract_vivienda == 22.3 or $caract_vivienda <= 100){
					$conteo43 = $conteo43 +1;
				}
            }else{
				if($caract_vivienda == 0 or $caract_vivienda <= 5.6){
					$conteo03 = $conteo03 +1;
				}
				elseif($caract_vivienda == 5.7 or $caract_vivienda <= 11.1){
					$conteo13 = $conteo13 +1;
				}
				elseif($caract_vivienda == 11.2 or $caract_vivienda <= 16.7){
					$conteo23 = $conteo23 +1;
				}
				elseif($caract_vivienda == 16.8 or $caract_vivienda <= 27.8){
					$conteo33 = $conteo33 +1;
				}
				elseif($caract_vivienda == 27.9 or $caract_vivienda <= 100){
					$conteo43 = $conteo43 +1;
				}
			} 
			
              //influencia_extralaboral
 			 if($formato=='A'){  		  
				if($influencia_extralaboral == 0 or $influencia_extralaboral <= 8.3){
					$conteo04 = $conteo04 +1;
				}
				elseif($influencia_extralaboral == 8.4 or $influencia_extralaboral <= 16.7){
					$conteo14 = $conteo14 +1;
				}
				elseif($influencia_extralaboral == 16.8 or $influencia_extralaboral <= 25.0){
					$conteo24 = $conteo24 +1;
				}
				elseif($influencia_extralaboral == 25.1 or $influencia_extralaboral <= 41.7){
					$conteo34 = $conteo34 +1;
				}
				elseif($influencia_extralaboral == 41.8 or $influencia_extralaboral <= 100){
					$conteo44 = $conteo44 +1;
				}
 			}else{
				if($influencia_extralaboral == 0 or $influencia_extralaboral <= 0.9){
					$conteo04 = $conteo04 +1;
				}
				elseif($influencia_extralaboral == 1 or $influencia_extralaboral <= 16.7){
					$conteo14 = $conteo14 +1;
				}
				elseif($influencia_extralaboral == 16.8 or $influencia_extralaboral <= 25.0){
					$conteo24 = $conteo24 +1;
				}
				elseif($influencia_extralaboral == 25.1 or $influencia_extralaboral <= 41.7){
					$conteo34 = $conteo34 +1;
				}
				elseif($influencia_extralaboral == 41.8 or $influencia_extralaboral <= 100){
					$conteo44 = $conteo44 +1;
				}
			} 
				
            
               //desplaz_vivienda
 
				if($desplaz_vivienda == 0 or $desplaz_vivienda <= 0.9){
					$conteo05 = $conteo05 +1;
				}
				elseif($desplaz_vivienda == 1.0 or $desplaz_vivienda <= 12.5){
					$conteo15 = $conteo15 +1;
				}
				elseif($desplaz_vivienda == 12.6 or $desplaz_vivienda <= 25.0){
					$conteo25 = $conteo25 +1;
				}
				elseif($desplaz_vivienda == 25.1 or $desplaz_vivienda <= 43.8){
					$conteo35 = $conteo35 +1;
				}
				elseif($desplaz_vivienda == 43.9 or $desplaz_vivienda <= 100){
					$conteo45 = $conteo45 +1;
				}
        

				
            //total_extralaboral
		    if($formato=='A'){ 
				if($total_extralaboral == 0 or $total_extralaboral <= 11.3){
					$conteo06 = $conteo06 +1;
				}
				elseif($total_extralaboral == 11.4 or $total_extralaboral <= 16.9){
					$conteo16 = $conteo16 +1;
				}
				elseif($total_extralaboral == 17.0 or $total_extralaboral <= 22.6){
					$conteo26 = $conteo26 +1;
				}
				elseif($total_extralaboral == 22.7 or $total_extralaboral <= 29.0){
					$conteo36 = $conteo36 +1;
				}
				elseif($total_extralaboral == 29.1 or $total_extralaboral <= 100){
					$conteo46 = $conteo46 +1;
				}
			}else{
				if($total_extralaboral == 0 or $total_extralaboral <= 12.9){
					$conteo06 = $conteo06 +1;
				}
				elseif($total_extralaboral == 13.0 or $total_extralaboral <= 17.7){
					$conteo16 = $conteo16 +1;
				}
				elseif($total_extralaboral == 17.8 or $total_extralaboral <= 24.2){
					$conteo26 = $conteo26 +1;
				}
				elseif($total_extralaboral == 24.3 or $total_extralaboral <= 32.3){
					$conteo36 = $conteo36 +1;
				}
				elseif($total_extralaboral == 32.4 or $total_extralaboral <= 100){
					$conteo46 = $conteo46 +1;
				}
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
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4,$array5,$array6,$array7);
        
        return $arrayFin;
    }
    
    public function PSICOSOCIAL_EXTRALABORALByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_extralaboral  where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ORDER BY fechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
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
            $tiempo_fuera = $x->tiempo_fuera;
			$formato= $x->formato;
            $relaciones_familiares = $x->relaciones_familiares;
            $com_relaciones_interperson = $x->com_relaciones_interperson;
            $situacion_económica = $x->situacion_económica;
            $caract_vivienda = $x->caract_vivienda;
             $influencia_extralaboral = $x->influencia_extralaboral;
            $desplaz_vivienda = $x->desplaz_vivienda;
            $total_extralaboral = $x->total_extralaboral;
            
          
            
            //tiempo_fuera
            if($tiempo_fuera == 0 or $tiempo_fuera <= 6.3){
                $conteo0 = $conteo0 +1;
            }
            elseif($tiempo_fuera == 6.4 or $tiempo_fuera <= 25.0){
                $conteo1 = $conteo1 +1;
            }
            elseif($tiempo_fuera == 25.1 or $tiempo_fuera <= 37.5){
                $conteo2 = $conteo2 +1;
            }
            elseif($tiempo_fuera == 37.6 or $tiempo_fuera <= 50.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($tiempo_fuera == 50.1 or $tiempo_fuera <= 100){
                $conteo4 = $conteo4 +1;
            }
         //relaciones_familiares
            if($relaciones_familiares == 0 or $relaciones_familiares <= 8.3){
                $conteo00 = $conteo00 +1;
            }
            elseif($relaciones_familiares == 8.4 or $relaciones_familiares <= 25.0){
                $conteo10 = $conteo10 +1;
            }
            elseif($relaciones_familiares == 25.1 or $relaciones_familiares <= 33.3){
                $conteo20 = $conteo20 +1;
            }
            elseif($relaciones_familiares == 33.4 or $relaciones_familiares <= 50.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($relaciones_familiares == 50.1 or $relaciones_familiares <= 100){
                $conteo40 = $conteo40 +1;
            }
            
             //com_relaciones_interperson
			 if($formato=='A'){ 
				if($com_relaciones_interperson == 0 or $com_relaciones_interperson <= 0.9){
					$conteo01 = $conteo01 +1;
				}
				elseif($com_relaciones_interperson == 1.0 or $com_relaciones_interperson <= 10.0){
					$conteo11 = $conteo11 +1;
				}
				elseif($com_relaciones_interperson == 10.1 or $com_relaciones_interperson <= 20.0){
					$conteo21 = $conteo21 +1;
				}
				elseif($com_relaciones_interperson == 20.1 or $com_relaciones_interperson <= 30.0){
					$conteo31 = $conteo31 +1;
				}
				elseif($com_relaciones_interperson == 30.1 or $com_relaciones_interperson <= 100){
					$conteo41 = $conteo41 +1;
				}
            }else{
				if($com_relaciones_interperson == 0 or $com_relaciones_interperson <= 5.0){
					$conteo01 = $conteo01 +1;
				}
				elseif($com_relaciones_interperson == 5.1 or $com_relaciones_interperson <= 15.0){
					$conteo11 = $conteo11 +1;
				}
				elseif($com_relaciones_interperson == 15.1 or $com_relaciones_interperson <= 25.0){
					$conteo21 = $conteo21 +1;
				}
				elseif($com_relaciones_interperson == 25.1 or $com_relaciones_interperson <= 35.0){
					$conteo31 = $conteo31 +1;
				}
				elseif($com_relaciones_interperson == 35.1 or $com_relaciones_interperson <= 100){
					$conteo41 = $conteo41 +1;
				}	
			}
             //situacion_económica
			 if($formato=='A'){  
				if($situacion_económica == 0 or $situacion_económica <= 8.3){
					$conteo02 = $conteo02 +1;
				}
				elseif($situacion_económica == 8.4 or $situacion_económica <= 25.0){
					$conteo12 = $conteo12 +1;
				}
				elseif($situacion_económica == 25.1 or $situacion_económica <= 33.3){
					$conteo22 = $conteo22 +1;
				}
				elseif($situacion_económica == 33.4 or $situacion_económica <= 50.0){
					$conteo32 = $conteo32 +1;
				}
				elseif($situacion_económica == 50.1 or $situacion_económica <= 100){
					$conteo42 = $conteo42 +1;
				}
            }else{
				if($situacion_económica == 0 or $situacion_económica <= 16.7){
					$conteo02 = $conteo02 +1;
				}
				elseif($situacion_económica == 16.8 or $situacion_económica <= 25.0){
					$conteo12 = $conteo12 +1;
				}
				elseif($situacion_económica == 25.1 or $situacion_económica <= 41.7){
					$conteo22 = $conteo22 +1;
				}
				elseif($situacion_económica == 41.8 or $situacion_económica <= 50.0){
					$conteo32 = $conteo32 +1;
				}
				elseif($situacion_económica == 50.1 or $situacion_económica <= 100){
					$conteo42 = $conteo42 +1;
				}

			}
              //caract_vivienda
			if($formato=='A'){  	
				if($caract_vivienda == 0 or $caract_vivienda <= 5.6){
					$conteo03 = $conteo03 +1;
				}
				elseif($caract_vivienda == 5.7 or $caract_vivienda <= 11.1){
					$conteo13 = $conteo13 +1;
				}
				elseif($caract_vivienda == 11.2 or $caract_vivienda <= 13.9){
					$conteo23 = $conteo23 +1;
				}
				elseif($caract_vivienda == 14.0 or $caract_vivienda <= 22.2){
					$conteo33 = $conteo33 +1;
				}
				elseif($caract_vivienda == 22.3 or $caract_vivienda <= 100){
					$conteo43 = $conteo43 +1;
				}
            }else{
				if($caract_vivienda == 0 or $caract_vivienda <= 5.6){
					$conteo03 = $conteo03 +1;
				}
				elseif($caract_vivienda == 5.7 or $caract_vivienda <= 11.1){
					$conteo13 = $conteo13 +1;
				}
				elseif($caract_vivienda == 11.2 or $caract_vivienda <= 16.7){
					$conteo23 = $conteo23 +1;
				}
				elseif($caract_vivienda == 16.8 or $caract_vivienda <= 27.8){
					$conteo33 = $conteo33 +1;
				}
				elseif($caract_vivienda == 27.9 or $caract_vivienda <= 100){
					$conteo43 = $conteo43 +1;
				}
			} 
			
              //influencia_extralaboral
 			 if($formato=='A'){  		  
				if($influencia_extralaboral == 0 or $influencia_extralaboral <= 8.3){
					$conteo04 = $conteo04 +1;
				}
				elseif($influencia_extralaboral == 8.4 or $influencia_extralaboral <= 16.7){
					$conteo14 = $conteo14 +1;
				}
				elseif($influencia_extralaboral == 16.8 or $influencia_extralaboral <= 25.0){
					$conteo24 = $conteo24 +1;
				}
				elseif($influencia_extralaboral == 25.1 or $influencia_extralaboral <= 41.7){
					$conteo34 = $conteo34 +1;
				}
				elseif($influencia_extralaboral == 41.8 or $influencia_extralaboral <= 100){
					$conteo44 = $conteo44 +1;
				}
 			}else{
				if($influencia_extralaboral == 0 or $influencia_extralaboral <= 0.9){
					$conteo04 = $conteo04 +1;
				}
				elseif($influencia_extralaboral == 1 or $influencia_extralaboral <= 16.7){
					$conteo14 = $conteo14 +1;
				}
				elseif($influencia_extralaboral == 16.8 or $influencia_extralaboral <= 25.0){
					$conteo24 = $conteo24 +1;
				}
				elseif($influencia_extralaboral == 25.1 or $influencia_extralaboral <= 41.7){
					$conteo34 = $conteo34 +1;
				}
				elseif($influencia_extralaboral == 41.8 or $influencia_extralaboral <= 100){
					$conteo44 = $conteo44 +1;
				}
			} 
				
            
               //desplaz_vivienda
 
				if($desplaz_vivienda == 0 or $desplaz_vivienda <= 0.9){
					$conteo05 = $conteo05 +1;
				}
				elseif($desplaz_vivienda == 1.0 or $desplaz_vivienda <= 12.5){
					$conteo15 = $conteo15 +1;
				}
				elseif($desplaz_vivienda == 12.6 or $desplaz_vivienda <= 25.0){
					$conteo25 = $conteo25 +1;
				}
				elseif($desplaz_vivienda == 25.1 or $desplaz_vivienda <= 43.8){
					$conteo35 = $conteo35 +1;
				}
				elseif($desplaz_vivienda == 43.9 or $desplaz_vivienda <= 100){
					$conteo45 = $conteo45 +1;
				}
        

				
            //total_extralaboral
		    if($formato=='A'){ 
				if($total_extralaboral == 0 or $total_extralaboral <= 11.3){
					$conteo06 = $conteo06 +1;
				}
				elseif($total_extralaboral == 11.4 or $total_extralaboral <= 16.9){
					$conteo16 = $conteo16 +1;
				}
				elseif($total_extralaboral == 17.0 or $total_extralaboral <= 22.6){
					$conteo26 = $conteo26 +1;
				}
				elseif($total_extralaboral == 22.7 or $total_extralaboral <= 29.0){
					$conteo36 = $conteo36 +1;
				}
				elseif($total_extralaboral == 29.1 or $total_extralaboral <= 100){
					$conteo46 = $conteo46 +1;
				}
			}else{
				if($total_extralaboral == 0 or $total_extralaboral <= 12.9){
					$conteo06 = $conteo06 +1;
				}
				elseif($total_extralaboral == 13.0 or $total_extralaboral <= 17.7){
					$conteo16 = $conteo16 +1;
				}
				elseif($total_extralaboral == 17.8 or $total_extralaboral <= 24.2){
					$conteo26 = $conteo26 +1;
				}
				elseif($total_extralaboral == 24.3 or $total_extralaboral <= 32.3){
					$conteo36 = $conteo36 +1;
				}
				elseif($total_extralaboral == 32.4 or $total_extralaboral <= 100){
					$conteo46 = $conteo46 +1;
				}
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
         array_push($arrayFin,$array,$array1,$array2,$array3,$array4,$array5,$array6,$array7);
        
        return $arrayFin;
    }
}
