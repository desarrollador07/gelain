<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class usuariosl extends Model
{

    protected $fillable = [
 
    'name',
    'email',
    'email_verified_at',
    'password',
    'remember_token',
    'created_at' ,
    'updated_at' ,
    
    ];

    protected $table = 'users';
    protected $primaryKey = 'id';
    public $timestamps = false;
}