<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colony extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'colony_type_id',
        'space_object_id',
        'civilization_id'
    ];

    function getColumns()
    {

        $colonyTypes = [];
        foreach (ColonyType::get() as $colonyType) {
            $colonyTypes[] = [
                'value' => $colonyType->id,
                'label' => $colonyType->runame
            ];
        }

        $spaceObjects = [];
        foreach (SpaceObject::get() as $spaceObject) {
            $spaceObjects[] = [
                'value' => $spaceObject->id,
                'label' => $spaceObject->name
            ];
        }

        return [
            'name' => ['Название колонии', 'text'],
            'colony_type_id' => ['Тип колонии', 'select', $colonyTypes],
            'name' => ['Название колонии', 'select', $spaceObjects],
        ];
    }
}
