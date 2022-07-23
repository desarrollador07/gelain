<?php

namespace App\Http\Controllers;
use App\Models\valoracionFisica;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class valorFisicoController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return valoracionFisica::all();
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
        return valoracionFisica::create($request->all());

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
    public function update(Request $request, $vafid)
    {
        $cl = valoracionFisica::findOrfail($vafid);
        $cl -> vafidempresa = $request-> vafidempresa;
        $cl -> vafidarea = $request -> vafidarea;
        $cl -> vafidnombre = $request-> vafidnombre;
        $cl -> vafsede = $request -> vafsede;
        $cl -> vafpeso = $request-> vafpeso;
        $cl -> vaftalla = $request -> vaftalla;
        $cl -> vafimc = $request-> vafimc;
        $cl -> vafperimetro = $request -> vafperimetro;
        $cl -> vafp0 = $request -> vafp0;
        $cl -> vafp1 = $request -> vafp1;
        $cl -> vafp2 = $request -> vafp2;
        $cl -> vaftestbiering = $request -> vaftestbiering;
        $cl -> vaftestpuenteder = $request -> vaftestpuenteder;
        $cl -> vaftestpuenteizq = $request -> vaftestpuenteizq;
        $cl -> vaftestresistronco = $request -> vaftestresistronco;
        $cl -> vaftestflextronco = $request -> vaftestflextronco;
        $cl -> vaftestmovhombder = $request -> vaftestmovhombder;
        $cl -> vaftestmovhombizq = $request -> vaftestmovhombizq;
        $cl -> vafcedula = $request -> vafcedula;
        $cl -> vafsexo = $request -> vafsexo;
        $cl -> vafgruposanguineo = $request -> vafgruposanguineo;
        $cl -> vaftelefono = $request -> vaftelefono;
        $cl -> vafciudad = $request -> vafciudad;
        $cl -> vafedad = $request -> vafedad;
        $cl -> vafcorreo = $request -> vafcorreo;
        $cl -> vafcargo = $request -> vafcargo;
        $cl -> vaffecha = $request -> vaffecha;
        $cl -> vafcs01 = $request -> vafcs01;
        $cl -> vafcs02 = $request -> vafcs02;
        $cl -> vafcs03 = $request -> vafcs03;
        $cl -> vafcs04 = $request -> vafcs04;
        $cl -> vafcs05 = $request -> vafcs05;
        $cl -> vafcs06 = $request -> vafcs06;
        $cl -> vafcs07 = $request -> vafcs07;
        $cl -> vafcs08 = $request -> vafcs08;
        $cl -> vafcs09 = $request -> vafcs09;
        $cl -> vafcs10 = $request -> vafcs10;
        $cl -> vafcs11 = $request -> vafcs11;
        $cl -> vafcs12 = $request -> vafcs12;
        $cl -> vafcs13 = $request -> vafcs13;
        $cl -> vafcs14 = $request -> vafcs14;
        $cl -> vafcs15 = $request -> vafcs15;
        $cl -> vafcs16 = $request -> vafcs16;
        $cl -> vafcs17 = $request -> vafcs17;
        $cl -> vafcs18 = $request -> vafcs18;
        $cl -> vafcs19 = $request -> vafcs19;
        $cl -> vafcs20 = $request -> vafcs20;
        $cl -> vafcs21 = $request -> vafcs21;
        $cl -> vafcancer_opc = $request -> vafcancer_opc;
        $cl -> vafcancer_var = $request -> vafcancer_var;
        $cl -> vafhiper_arte_opc = $request -> vafhiper_arte_opc;
        $cl -> vafhiper_arte_var = $request -> vafhiper_arte_var;
        $cl -> vafasma_opc = $request -> vafasma_opc;
        $cl -> vafasma_var = $request -> vafasma_var;
        $cl -> vafcardio_opc = $request -> vafcardio_opc;
        $cl -> vafcardio_var = $request -> vafcardio_var;
        $cl -> vafdiabet_opc = $request -> vafdiabet_opc;
        $cl -> vafdiabet_var = $request -> vafdiabet_var;
        $cl -> vafalergia_opc = $request -> vafalergia_opc;
        $cl -> vafalergia_var = $request -> vafalergia_var;
        $cl -> vafartritis_opc = $request -> vafartritis_opc;
        $cl -> vafartritis_var = $request -> vafartritis_var;
        $cl -> vafem_opc = $request -> vafem_opc;
        $cl -> vafem_var = $request -> vafem_var;
        $cl -> vafer_opc = $request -> vafer_opc;
        $cl -> vafer_var = $request -> vafer_var;
        $cl -> vafmujer40_opc = $request -> vafmujer40_opc;
        $cl -> vafmujer40_var = $request -> vafmujer40_var;
        $cl -> vafhombre40_opc = $request -> vafhombre40_opc;
        $cl -> vafhombre40_var = $request -> vafhombre40_var;
        $cl -> vafdiscapacidad_opc = $request -> vafdiscapacidad_opc;
        $cl -> vafdiscapacidad_var = $request -> vafdiscapacidad_var;
        $cl -> vaf_familiap01_opc = $request -> vaf_familiap01_opc;
        $cl -> vaf_familiap02_opc = $request -> vaf_familiap02_opc;
        $cl -> vaf_familia_num = $request -> vaf_familia_num;
        $cl -> vaf_actifisip01_opc = $request -> vaf_actifisip01_opc;
        $cl -> vaf_actifisip02_opc = $request -> vaf_actifisip02_opc;
        $cl -> vaf_actifisi_num = $request -> vaf_actifisi_num;
        $cl -> vaf_nutricionp01_opc = $request -> vaf_nutricionp01_opc;
        $cl -> vaf_nutricionp02_opc = $request -> vaf_nutricionp02_opc;
        $cl -> vaf_nutricionp03_opc = $request -> vaf_nutricionp03_opc;
        $cl -> vaf_nutricionp03_var = $request -> vaf_nutricionp03_var;
        $cl -> vaf_tabacop01_opc = $request -> vaf_tabacop01_opc;
        $cl -> vaf_tabacop02_opc = $request -> vaf_tabacop02_opc;
        $cl -> vaf_tabacop02_var = $request -> vaf_tabacop02_var;
        $cl -> vaf_alcoholp01_opc = $request -> vaf_alcoholp01_opc;
        $cl -> vaf_alcoholp02_opc = $request -> vaf_alcoholp02_opc;
        $cl -> vaf_alcoholp03_opc = $request -> vaf_alcoholp03_opc;
        $cl -> vaf_suenop01_opc = $request -> vaf_suenop01_opc;
        $cl -> vaf_suenop02_opc = $request -> vaf_suenop02_opc;
        $cl -> vaf_suenop03_opc = $request -> vaf_suenop03_opc;
        $cl -> vaf_tipop01_opc = $request -> vaf_tipop01_opc;
        $cl -> vaf_tipop02_opc = $request -> vaf_tipop02_opc;
        $cl -> vaf_introspep01_opc = $request -> vaf_introspep01_opc;
        $cl -> vaf_introspep02_opc = $request -> vaf_introspep02_opc;
        $cl -> vaf_introspep03_opc = $request -> vaf_introspep03_opc;
        $cl -> vaf_condup01_opc = $request -> vaf_condup01_opc;
        $cl -> vaf_condup02_opc = $request -> vaf_condup02_opc;
        $cl -> vaf_otrasdp01_opc = $request -> vaf_otrasdp01_opc;
        $cl -> vaf_otrasdp02_opc = $request -> vaf_otrasdp02_opc;
        $cl -> vaf_otrasdp03_opc = $request -> vaf_otrasdp03_opc;
        $cl -> vaf_nutricion_num = $request -> vaf_nutricion_num;
        $cl -> vaf_tabaco_num = $request -> vaf_tabaco_num;
        $cl -> vaf_alcohol_num = $request -> vaf_alcohol_num;
        $cl -> vaf_sueno_num = $request -> vaf_sueno_num;
        $cl -> vaf_tipo_num = $request -> vaf_tipo_num;
        $cl -> vaf_introspe_num = $request -> vaf_introspe_num;
        $cl -> vaf_condu_num = $request -> vaf_condu_num;
        $cl -> vaf_otrasd_num = $request -> vaf_otrasd_num;
        $cl -> vaf_fantastico_total = $request -> vaf_fantastico_total;
        $cl -> vafAF_p01 = $request -> vafAF_p01;
        $cl -> vafAF_p02 = $request -> vafAF_p02;
        $cl -> update(); 
        return $cl;
    }
    
    public function buscarValoracionFisicaFecha($idEmp,$fecha1,$fecha2)
    {   
        $fecha1M = $fecha1.' 00:00:00';
        $fecha2M = $fecha2.' 23:59:59';
        $result = DB::select('SELECT * FROM valoracionfisica WHERE vafidempresa = (?) AND vaf_fecha_creacion BETWEEN (?) AND (?) ORDER BY vaf_fecha_creacion ASC ;',[$idEmp,$fecha1M,$fecha2M]);
        
        return $result;
    }
    
        public function buscarIdAreaVF($idEmp,$idArea)
    {
        $result = DB::select('SELECT * FROM valoracionfisica where vafidempresa = (?) AND vafidarea = (?) ;',[$idEmp,$idArea]);
        return  $result;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($vafid)
    {
        $cl = valoracionFisica::findOrfail($vafid);
        $cl -> delete();
    }
    
            public function buscarValoracionFisica($vafid)
    {
    $user = valoracionFisica::where("vafidempresa","=",$vafid)->get();
       
        return  $user;
    }
    
    
}