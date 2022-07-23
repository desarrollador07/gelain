<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class extralaboral extends Model
{

    protected $fillable = [
        'extidempleado',
        'extfaciltransporte',
        'extvariostransporte',
        'extmuchotiemviaje',
        'exttranscomodo',
        'extzonasegura',
        'extzonadelincuencia',
        'extfacilcmedico',
        'extbuenasvias',
        'extcercatransporte',
        'extcondicvivienda',
        'extagualuz',
        'extpermdescanzar',
        'extviviendacomoda',
        'exttiemporecreo',
        'exttiempodescanzo',
        'exttiempopersonal',
        'exttiempofamilia',
        'extbuenacomunica',
        'extrelacionamigos',
        'extconversoperson',
        'extamigosescuchan',
        'extapoyofamiliar',
        'exthabloconperso',
        'extproblemfamiliar',
        'extrelacionfamiliar',
        'extquitanenergia',
        'extresolveamistosa',
        'extafectrelacionestra',
        'extdineroalcanza',
        'extpresupuesfamilia',
        'extdeudashogar',
        //extfechareg,
       // extfechamod,
        'extusuarioreg' 
    
    ];

    protected $table = 'extralaboral';
    protected $primaryKey = 'extid';
    public $timestamps = false;
}

