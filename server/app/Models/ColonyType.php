<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColonyType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'runame'
    ];

    static public function getColumns()
    {
        return [
            'runame' => ['Название', 'text'],
            'name' => ['Системное имя', 'text'],
        ];
    }
}
