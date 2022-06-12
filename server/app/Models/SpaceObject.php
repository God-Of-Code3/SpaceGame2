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

    static public function getColumns()
    {
        $spaceObjectTypes = [];
        foreach (SpaceObjectType::get() as $spaceObjectType) {
            $spaceObjectTypes[] = [
                'value' => $spaceObjectType->id,
                'label' => $spaceObjectType->runame,
            ];
        }

        $universes = [];
        foreach (Universe::get() as $universe) {
            $universes[] = [
                'value' => $universe->id,
                'label' => $universe->name,
            ];
        }

        return [
            'name' => ['Название', 'text'],
            'x' => ['X', 'number'],
            'y' => ['Y', 'number'],
            'rad' => ['Радиус', 'number'],
            'dist' => ['Орбита', 'number'],
            'angle' => ['Нач. угл', 'number'],
            'period' => ['Период', 'number'],
            'space_object_type_id' => ['Тип объекта', 'select', $spaceObjectTypes],
        ];
    }
}
