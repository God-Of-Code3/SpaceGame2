<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpaceObjectType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'runame'
    ];
}
