<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class area extends Model
{

    protected $fillable = [

        'areempresa' ,
        'arenombre' ,
        'arefechaini' ,
        'areactivo' 
    
    ];

    protected $table = 'area';
    protected $primaryKey = 'areid';
    public $timestamps = false;
}