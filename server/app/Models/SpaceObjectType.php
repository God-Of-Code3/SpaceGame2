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

    static public function getColumns()
    {
        return [
            'runame' => ['Название', 'text'],
            'name' => ['Системное имя', 'text'],
            'description' => ['Описание', 'text']
        ];
    }
}
