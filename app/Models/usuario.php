<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class usuario extends Model
{

    protected $fillable = [
 
    'usucodigo',
    'usunombre',
    'usupassw',
    'usucargo',
    'usufechacrea',
    'usufechamod' ,
    'usufechaulting' ,
    'usuipulting' ,
    'usuperfil' ,
    'usuactivo' ,
    'usudetalle' 
    
    ];

    protected $table = 'usuario';
    protected $primaryKey = 'usuid';
    public $timestamps = false;
}