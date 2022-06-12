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

    static public function getColumns()
    {
        $spaceObjectTypes = [
            [
                'value' => 0,
                'label' => 'Все типы'
            ]
        ];
        foreach (SpaceObjectType::get() as $spaceObjectType) {
            $spaceObjectTypes[] = [
                'value' => $spaceObjectType->id,
                'label' => $spaceObjectType->runame,
            ];
        }
        return [
            'runame' => ['Название', 'text'],
            'name' => ['Системное имя', 'text'],
            'description' => ['Описание', 'text'],
            'type' => ['Тип значения', 'select', [
                [
                    'value' => 'text',
                    'label' => 'Текст',
                ],
                [
                    'value' => 'number',
                    'label' => 'Число',
                ],
                [
                    'value' => 'select',
                    'label' => 'Выборочное',
                ],
            ]],
            'space_object_type_id' => ['Тип объекта', 'select', $spaceObjectTypes],
            'default' => ['По умолчанию', 'text'],

        ];
    }
}
