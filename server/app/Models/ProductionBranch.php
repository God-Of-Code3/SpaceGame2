<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionBranch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'production_category_id'
    ];

    static public function getColumns()
    {

        return [
            'name' => ['Название', "text"],
            'description' => ['Описание', "text"],
        ];
    }
}
