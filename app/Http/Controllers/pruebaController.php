<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\prueba;

class pruebaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return prueba::all();
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
        return prueba::create($request->all());
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
    public function update(Request $request, $pr_id)
    {
        $pr = prueba::findOrfail($pr_id);

        $pr ->nombre      =$request -> nombre;
        $pr ->confirmar   =$request -> confirmar;
        $pr ->edad        =$request -> edad;
        $pr ->tipo        =$request -> tipo;
        $pr ->biginteger  =$request -> biginteger;
        $pr ->fecha       =$request -> fecha;
        $pr ->estado      =$request -> estado;
        $pr ->fecha2      =$request -> fecha2;
        $pr ->lab_opa_id  =$request -> lab_opa_id;
        $pr -> update();
        return $pr;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($pr_id)
    {
        $pr = prueba::findOrfail($pr_id);
        $pr -> delete();
    }
}
