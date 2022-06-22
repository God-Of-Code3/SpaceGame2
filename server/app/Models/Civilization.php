<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Civilization extends Model
{
    protected $fillable = [
        'name',
        'level',
        'starting_planet_id',
        'user_universe_member_id'
    ];
    use HasFactory;
}
