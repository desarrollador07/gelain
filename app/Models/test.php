<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class test extends Model
{

    protected $fillable = [
        'opa_id',
        'nombre',
        'apellido'];

    protected $table = 'laboratorio';
    protected $primaryKey = 'opa_id';
    public $timestamps = false;
}
