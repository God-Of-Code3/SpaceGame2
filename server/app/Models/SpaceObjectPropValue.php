<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpaceObjectPropValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'space_object_id',
        'space_object_prop_type_id',
        'value',
    ];
}
