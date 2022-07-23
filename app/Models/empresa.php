<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class empresa extends Model
{

    protected $fillable = [

        'empnit' ,
        'empnombre' ,
        'emprepresentante' ,
        'empdepartamento' ,
        'empciudad',
        'empdireccion' ,
        'emptelefono',
        'empactiva',
        'empfechaini'
    ];

    protected $table = 'empresa';
    protected $primaryKey = 'empid';
    public $timestamps = false;
}
