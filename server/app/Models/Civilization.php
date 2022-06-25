<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Civilization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'level',
        'starting_planet_id',
        'user_universe_member_id'
    ];

    static public function getColumns()
    {

        $spaceObjects = [];
        foreach (SpaceObject::get() as $spaceObject) {
            $spaceObjects[] = [
                'value' => $spaceObject->id,
                'label' => $spaceObject->name,
            ];
        }

        return [
            'name' => ['Название', 'text'],
            'level' => ['Уровень развития', 'number'],
            'starting_planet_id' => ['Материнская планета', 'select', $spaceObjects],
        ];
    }
}
