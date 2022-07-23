<?php

namespace App\Http\Controllers;
use App\Models\empresa;
use Illuminate\Http\Request;

class empresaController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return empresa::all();
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
        return empresa::create($request->all());
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
    public function update(Request $request, $opa_id)
    {
        $cl = empresa::findOrfail($opa_id);
        $cl -> empnit = $request->empnit;
        $cl -> empnombre = $request -> empnombre;
        $cl -> emprepresentante = $request->emprepresentante;
        $cl -> empdepartamento = $request -> empdepartamento;
        $cl -> empciudad = $request->empciudad;
        $cl -> empdireccion = $request -> empdireccion;
        $cl -> emptelefono = $request->emptelefono;
        $cl -> empactiva = $request -> empactiva;
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
        $cl = empresa::findOrfail($opa_id);
        $cl -> delete();
    }
    
            public function buscaridempresa($idEmp)
    {
    $user = empresa::where("empid","=",$idEmp)->get();
       
        return  $user;
    }
}
