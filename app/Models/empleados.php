<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class empleados extends Model
{

    protected $fillable = [
        'emdcedula' ,
        'emdnombres' ,
        'emdapellidos' ,
        'emdsexo' ,
        'emdfecnacido' ,
        'emdestcivil' ,
        'emdnivelestudio' ,
        'emdprofesion' ,
        'emddepartamento' ,
        'emdciudad' ,
        'emddireccion' ,
        'emdtelefono' ,
        'emdemail' ,
        'emdestracto' ,
        'emdtipovivienda' ,
        'emdpersdepen' ,
        'emdempresa' ,
        'emdtiempolab' ,
        'emdcargo' ,
        'emdtipodecargo' ,
        'emdtiemcargo' ,
        'emdarea' ,
        'emdtipocontrato' ,
        'emdhorasdia'  ,
        'emdtiposalario' ,
        'emdusuarioreg' ,
        'emdipreg',
        'emdactivo',
        'emdzona',
        'emdtraciudad',
        'emdtradepartamento',
        'emdfechamod',
        'emdfechareg'
    ];

    protected $table = 'empleado';
    protected $primaryKey = 'emdid';
    public $timestamps = false;
}

