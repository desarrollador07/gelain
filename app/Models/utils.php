<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class utils extends Model
{
    protected $fillable = [
        'nombre',
        'nit',
        'telefono',
        'correo',
        'instagram'];
}
