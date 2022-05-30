<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpaceObjectPropType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'runame',
        'default',
        'type',
        'space_object_type_id',
    ];
}
