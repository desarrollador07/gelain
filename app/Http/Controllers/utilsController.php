<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\utils;
class utilsController extends Controller
{
    /**
     * Display a listing of the resource.
     * funcion que maneja las variables globales del proyecto de cartera
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $utils = new utils();
        $utils->nombre = "GESTION LABORAL INTEGRAL DEL VALLE S.A.S.";
        $utils->nit = "901372313-4";
        $utils->telefono = "+57 3163428017";
        $utils->correo = "gelain.sst@gmail.com";
        $utils->instagram = "gelain.sst";
        return $utils;
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
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}