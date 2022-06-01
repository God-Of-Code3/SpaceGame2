<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpaceObject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'x',
        'y',
        'rad',
        'universe_id',
        'dist',
        'angle',
        'period',
        'space_object_type_id',
        'space_object_id',
    ];
}
