<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserUniverseMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'x',
        'y',
        'scale',
        'user_id',
        'universe_id',
    ];

    static public function getColumns()
    {

        $universes = [];
        foreach (Universe::get() as $universe) {
            $universes[] = [
                'value' => $universe->id,
                'label' => $universe->name
            ];
        }

        return [
            'x' => ['X камеры', 'number'],
            'y' => ['Y камеры', 'number'],
            'scale' => ['Масштаб камеры', 'number'],
            'universe_id' => ['Вселенная', 'select', $universes],
        ];
    }
}
