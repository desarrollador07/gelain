<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class prueba extends Model
{
    protected $fillable = [
        'pr_id',
        'codigo',
        'nombre',
        'confirmar',
        'edad',
        'tipo',
        'biginteger',
        'fecha',
        'estado',
        'fecha2',
        'lab_opa_id',
    ];

    protected $table = 'prueba';
    protected $primaryKey = 'pr_id';
    //public $timestamps = false;
}
