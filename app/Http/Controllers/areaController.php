<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\area;
class areaController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return area::all();
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
        return area::create($request->all());
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
    public function edit(Request $request,$id)
    {
        $cl = area::findOrfail($id);
        $cl -> arenombre = $request -> arenombre;
        $cl -> update();
        return $cl;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $areid)
    {
        $cl = area::findOrfail($areid);
        $cl -> areempresa = $request->areempresa;
        $cl -> arenombre = $request -> arenombre;
        $cl -> areactivo = $request -> areactivo;
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
        $cl = area::findOrfail($opa_id);
        $cl -> delete();
    }

    public function buscarid($idEmp)
    {
        $user = area::where("areempresa","=",$idEmp)->get();
       
        return  $user;
    }
}
