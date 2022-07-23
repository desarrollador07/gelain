<?php

namespace App\Http\Controllers;
use App\Models\empleados;
use App\Models\formatoA;
use App\Models\formatoB;
use App\Models\extralaboral;
use App\Models\estres;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class empleadosController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return empleados::all();
    }
    
      public function indexReportes($idEmp)
    {
        $result = empleados::where("emdempresa","=",$idEmp)
        ->select([
            'emdid',
            'emdcedula' ,
            'emdnombres' ,
            'emdapellidos' ,
            'emdsexo' ,
            'emdfecnacido' ,
            'emdestcivil' ,
            'emdnivelestudio' ,
            'emdprofesion' ,
            'emdciudad' ,
            'emddepartamento' ,
            'emdestracto' ,
            'emdtipovivienda' ,
            'emdpersdepen' ,
            'emdtraciudad' ,
            'emdtradepartamento' ,
            'emdfechareg',
            'emdempresa' ,
            'emdtiempolab' ,
            'emdcargo' ,
            'emdtipodecargo' ,
            'emdtiemcargo' ,
            'emdarea' ,
            'emdtipocontrato' ,
            'emdhorasdia'  ,
            'emdusuarioreg' 
        ])
        ->get();
        
        return $result;
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
        return empleados::create($request->all());
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
    public function update(Request $request, $emdid)
    {
        $fecha = Carbon::now();
        $cl = empleados::findOrfail($emdid);
        $cl -> emdcedula = $request->emdcedula;
        $cl -> emdnombres = $request -> emdnombres;
        $cl ->emdapellidos = $request ->emdapellidos;
        $cl ->emdsexo =$request ->emdsexo;
        $cl ->emdfecnacido = $request ->emdfecnacido;
        $cl ->emdestcivil = $request ->emdestcivil;
        $cl ->emdnivelestudio = $request ->emdnivelestudio;
        $cl ->emdprofesion = $request ->emdprofesion;
        $cl ->emddepartamento =$request ->emddepartamento;
        $cl ->emdciudad = $request ->emdciudad;
        $cl ->emddireccion = $request ->emddireccion;
        $cl ->emdtelefono = $request ->emdtelefono;
        $cl ->emdemail = $request ->emdemail;
        $cl ->emdestracto = $request ->emdestracto;
        $cl ->emdtipovivienda = $request ->emdtipovivienda;
        $cl ->emdpersdepen = $request ->emdpersdepen;
        $cl ->emdempresa = $request ->emdempresa;
        $cl ->emdtiempolab = $request ->emdtiempolab;
        $cl ->emdcargo = $request ->emdcargo;
        $cl ->emdtipodecargo = $request ->emdtipodecargo;
        $cl ->emdtiemcargo = $request ->emdtiemcargo;
        $cl ->emdarea = $request ->emdarea;
        $cl ->emdtipocontrato = $request ->emdtipocontrato;
        $cl ->emdhorasdia = $request -> emdhorasdia;
        $cl ->emdtiposalario = $request ->emdtiposalario;
        $cl ->emdusuarioreg = $request ->emdusuarioreg;
        $cl ->emdipreg = $request ->emdipreg;
        $cl ->emdactivo = $request -> emdactivo;
        $cl ->emdzona = $request -> emdzona;
        $cl ->emdtraciudad = $request -> emdtraciudad;
        $cl ->emdtradepartamento = $request -> emdtradepartamento;
        $cl ->emdfechamod = $fecha;
        $cl -> update();
        return $cl;
    }
    
        public function updateEstado($emdid)
    {
        $cl = empleados::findOrfail($emdid);
        $cl ->emdactivo = '1';
        $cl -> update();
        return $cl;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($opa_id)
    {
        $cl = empleados::findOrfail($opa_id);
        $dd = $cl->emdtipodecargo;
        
        if($dd == '1' or $dd == '2'){
            $fa = formatoA::where("inaidempleado","=",$opa_id);
        $fa -> delete();
        
        $extra = extralaboral::where("extidempleado","=",$opa_id);
        $extra -> delete();
        
       $estres = estres::where("estidempleado","=",$opa_id);
       $estres -> delete();
       $cl -> delete();
        }else{
                $fa = formatoB::where("inbidempleado","=",$opa_id);
        $fa -> delete();
        
        $extra = extralaboral::where("extidempleado","=",$opa_id);
        $extra -> delete();
        
       $estres = estres::where("estidempleado","=",$opa_id);
       $estres -> delete();
       $cl -> delete();
        }
    }
    

    
        public function buscarid($idEmp)
    {
    $user = empleados::where("emdempresa","=",$idEmp)->get();
        return  $user;
    }
    
        public function buscarIdAreaEmp($idEmp,$idArea)
    {
    $result = DB::select('SELECT * FROM empleado where emdempresa = (?) AND emdarea = (?) ;',[$idEmp,$idArea]);
        return  $result;
    }
    
     public function buscaridEmp($idEmp)
    {
    $user = empleados::where("emdid","=",$idEmp)->get();
        return  $user;
    }
    
    public function TotalGeneral($idEmp)
    {
        $result = DB::select('SELECT * FROM vw_total_general  where emdempresa = (?);',[$idEmp]);
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
        $aux = 0;

         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $total_intralaboral = $x->total_intralaboral;
            $total_extralaboral = $x->total_extralaboral;
            $total_general = $x->total_general;
            $formato = $x ->formato;
            $a = 'A';
            $b = 'B';

            if($formato == $a){
                //total_intralaboral
            if($total_intralaboral == 0 or $total_intralaboral <= 19.7){
                $conteo0 = $conteo0 +1;
            }
            elseif($total_intralaboral == 19.8 or $total_intralaboral <= 25.8){
                $conteo1 = $conteo1 +1;
            }
            elseif($total_intralaboral == 25.9 or $total_intralaboral <= 31.5){
                $conteo2 = $conteo2 +1;
            }
            elseif($total_intralaboral == 31.6 or $total_intralaboral <= 38.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($total_intralaboral == 38.1 or $total_intralaboral <= 100){
                $conteo4 = $conteo4 +1;
            }
            
            
         //total_extralaboral
            if($total_extralaboral == 0 or $total_extralaboral <= 11.3){
                $conteo00 = $conteo00 +1;
            }
            elseif($total_extralaboral == 11.4 or $total_extralaboral <= 16.9){
                $conteo10 = $conteo10 +1;
            }
            elseif($total_extralaboral == 17.0 or $total_extralaboral <= 22.6){
                $conteo20 = $conteo20 +1;
            }
            elseif($total_extralaboral == 22.7 or $total_extralaboral <= 29.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($total_extralaboral == 29.1 or $total_extralaboral <= 100){
                $conteo40 = $conteo40 +1;
            }
            
            
            //total_general
            if($total_general == 0 or $total_general <= 18.8){
                $conteo01 = $conteo01 +1;
            }
            elseif($total_general == 18.9 or $total_general <= 24.4){
                $conteo11 = $conteo11 +1;
            }
            elseif($total_general == 24.5 or $total_general <= 29.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($total_general == 29.6 or $total_general <= 35.4){
                $conteo31 = $conteo31 +1;
            }
            elseif($total_general == 35.5 or $total_general <= 100){
                $conteo41 = $conteo41 +1;
            }
            
            }
			
			
			
			
			
            if($formato !== $a){
                //total_intralaboral
            if($total_intralaboral == 0 or $total_intralaboral <= 20.6){
                $conteo0 = $conteo0 +1;
            }
            elseif($total_intralaboral == 20.7 or $total_intralaboral <= 26.0){
                $conteo1 = $conteo1 +1;
            }
            elseif($total_intralaboral == 26.1 or $total_intralaboral <= 31.2){
                $conteo2 = $conteo2 +1;
            }
            elseif($total_intralaboral == 31.3 or $total_intralaboral <= 38.7){
                $conteo3 = $conteo3 +1;
            }
            elseif($total_intralaboral == 38.8 or $total_intralaboral <= 100){
                $conteo4 = $conteo4 +1;
            }
            
            
         //total_extralaboral
            if($total_extralaboral == 0 or $total_extralaboral <= 12.9){
                $conteo00 = $conteo00 +1;
            }
            elseif($total_extralaboral == 13.0 or $total_extralaboral <= 17.7){
                $conteo10 = $conteo10 +1;
            }
            elseif($total_extralaboral == 17.8 or $total_extralaboral <= 24.2){
                $conteo20 = $conteo20 +1;
            }
            elseif($total_extralaboral == 24.3 or $total_extralaboral <= 32.3){
                $conteo30 = $conteo30 +1;
            }
            elseif($total_extralaboral == 32.4 or $total_extralaboral <= 100){
                $conteo40 = $conteo40 +1;
            }
                        
            //total_general
            if($total_general == 0 or $total_general <= 19.9){
                $conteo01 = $conteo01 +1;
            }
            elseif($total_general == 20.0 or $total_general <= 24.8){
                $conteo11 = $conteo11 +1;
            }
            elseif($total_general == 24.9 or $total_general <= 29.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($total_general == 29.6 or $total_general <= 35.4){
                $conteo31 = $conteo31 +1;
            }
            elseif($total_general == 35.5 or $total_general <= 100){
                $conteo41 = $conteo41 +1;
            }
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($arrayFin,$array,$array1,$array2);
        
        return $arrayFin;
    }
    
    public function buscarEmpleadosFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM empleado  WHERE emdempresa = (?) AND emdfechareg BETWEEN (?) AND (?) ORDER BY emdfechareg ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
        return $result;
    }
    
    public function buscarEmpleadosFechaReportes($idEmp,$fecha1,$fecha2)
    {
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM empleado  WHERE emdempresa = (?) AND emdfechareg BETWEEN (?) AND (?) ORDER BY emdfechareg ASC ;',[$idEmp,$fecha1M,$fecha2M])
        ->select([
            'emdid',
            'emdcedula' ,
            'emdnombres' ,
            'emdapellidos' ,
            'emdsexo' ,
            'emdfecnacido' ,
            'emdestcivil' ,
            'emdnivelestudio' ,
            'emdprofesion' ,
            'emdciudad' ,
            'emddepartamento' ,
            'emdestracto' ,
            'emdtipovivienda' ,
            'emdpersdepen' ,
            'emdtraciudad' ,
            'emdtradepartamento' ,
            'emdfechareg',
            'emdempresa' ,
            'emdtiempolab' ,
            'emdcargo' ,
            'emdtipodecargo' ,
            'emdtiemcargo' ,
            'emdarea' ,
            'emdtipocontrato' ,
            'emdhorasdia'  ,
            'emdusuarioreg' , 
        ])
        ->get();
        
        return $result;
    }
    
    public function TotalGeneralByFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM vw_total_general  where emdempresa = (?) AND fechareg BETWEEN (?) AND (?) ;',[$idEmp,$fecha1M,$fecha2M]);
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
        $aux = 0;

         for($i = 0, $size = count($result); $i < $size; ++$i) {
            $x = $result[$i];
            $total_intralaboral = $x->total_intralaboral;
            $total_extralaboral = $x->total_extralaboral;
            $total_general = $x->total_general;
            $formato = $x ->formato;
            $a = 'A';
            $b = 'B';

            if($formato == $a){
                //total_intralaboral
            if($total_intralaboral == 0 or $total_intralaboral <= 19.7){
                $conteo0 = $conteo0 +1;
            }
            elseif($total_intralaboral == 19.8 or $total_intralaboral <= 25.8){
                $conteo1 = $conteo1 +1;
            }
            elseif($total_intralaboral == 25.9 or $total_intralaboral <= 31.5){
                $conteo2 = $conteo2 +1;
            }
            elseif($total_intralaboral == 31.6 or $total_intralaboral <= 38.0){
                $conteo3 = $conteo3 +1;
            }
            elseif($total_intralaboral == 38.1 or $total_intralaboral <= 100){
                $conteo4 = $conteo4 +1;
            }
            
            
         //total_extralaboral
            if($total_extralaboral == 0 or $total_extralaboral <= 11.3){
                $conteo00 = $conteo00 +1;
            }
            elseif($total_extralaboral == 11.4 or $total_extralaboral <= 16.9){
                $conteo10 = $conteo10 +1;
            }
            elseif($total_extralaboral == 17.0 or $total_extralaboral <= 22.6){
                $conteo20 = $conteo20 +1;
            }
            elseif($total_extralaboral == 22.7 or $total_extralaboral <= 29.0){
                $conteo30 = $conteo30 +1;
            }
            elseif($total_extralaboral == 29.1 or $total_extralaboral <= 100){
                $conteo40 = $conteo40 +1;
            }
            
            
            //total_general
            if($total_general == 0 or $total_general <= 18.8){
                $conteo01 = $conteo01 +1;
            }
            elseif($total_general == 18.9 or $total_general <= 24.4){
                $conteo11 = $conteo11 +1;
            }
            elseif($total_general == 24.5 or $total_general <= 29.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($total_general == 29.6 or $total_general <= 35.4){
                $conteo31 = $conteo31 +1;
            }
            elseif($total_general == 35.5 or $total_general <= 100){
                $conteo41 = $conteo41 +1;
            }
            
            }
			
			
			
			
			
            if($formato !== $a){
                //total_intralaboral
            if($total_intralaboral == 0 or $total_intralaboral <= 20.6){
                $conteo0 = $conteo0 +1;
            }
            elseif($total_intralaboral == 20.7 or $total_intralaboral <= 26.0){
                $conteo1 = $conteo1 +1;
            }
            elseif($total_intralaboral == 26.1 or $total_intralaboral <= 31.2){
                $conteo2 = $conteo2 +1;
            }
            elseif($total_intralaboral == 31.3 or $total_intralaboral <= 38.7){
                $conteo3 = $conteo3 +1;
            }
            elseif($total_intralaboral == 38.8 or $total_intralaboral <= 100){
                $conteo4 = $conteo4 +1;
            }
            
            
         //total_extralaboral
            if($total_extralaboral == 0 or $total_extralaboral <= 12.9){
                $conteo00 = $conteo00 +1;
            }
            elseif($total_extralaboral == 13.0 or $total_extralaboral <= 17.7){
                $conteo10 = $conteo10 +1;
            }
            elseif($total_extralaboral == 17.8 or $total_extralaboral <= 24.2){
                $conteo20 = $conteo20 +1;
            }
            elseif($total_extralaboral == 24.3 or $total_extralaboral <= 32.3){
                $conteo30 = $conteo30 +1;
            }
            elseif($total_extralaboral == 32.4 or $total_extralaboral <= 100){
                $conteo40 = $conteo40 +1;
            }
                        
            //total_general
            if($total_general == 0 or $total_general <= 19.9){
                $conteo01 = $conteo01 +1;
            }
            elseif($total_general == 20.0 or $total_general <= 24.8){
                $conteo11 = $conteo11 +1;
            }
            elseif($total_general == 24.9 or $total_general <= 29.5){
                $conteo21 = $conteo21 +1;
            }
            elseif($total_general == 29.6 or $total_general <= 35.4){
                $conteo31 = $conteo31 +1;
            }
            elseif($total_general == 35.5 or $total_general <= 100){
                $conteo41 = $conteo41 +1;
            }
            }
            
        }

         array_push($array,$conteo0,$conteo1,$conteo2,$conteo3,$conteo4);
         array_push($array1,$conteo00,$conteo10,$conteo20,$conteo30,$conteo40);
         array_push($array2,$conteo01,$conteo11,$conteo21,$conteo31,$conteo41);
         array_push($arrayFin,$array,$array1,$array2);
        
        return $arrayFin;
    }
}
