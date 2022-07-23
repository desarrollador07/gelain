<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class estres extends Model
{

    protected $fillable = [
        'estidempleado',
        'estdolorcuello',
        'estprobgastrico',
        'estprobrespira',
        'estdolorcabeza',
        'esttrastsueno',
        'estpalpitacion',
        'estcamapetito',
        'estprobgenital',
        'estdiffamiliar',
        'estdifquieto',
        'estdifpersonas',
        'estsensaislami',
        'estsobrecarga',
        'estdifconcentrar',
        'estaumentaccid',
        'estsentfrustra',
        'estcansancio',
        'estdismrendimie',
        'estdeseonotrab',
        'estpocointeres',
        'estdifdecisiones',
        'estcambioempleo',
        'estsentisoledad',
        'estsentinegativo',
        'estsetangpretris',
        'estconsdrogas',
        'estsentinosirve',
        'estconsucigarri',
        'estperdirazon',
        'estcomprigido',
        'estsensproblem',
       // 'estfechareg',
       // 'estfechamod',
        'estusuarioreg'
    
    ];

    protected $table = 'estres';
    protected $primaryKey = 'estid';
    public $timestamps = false;
}

