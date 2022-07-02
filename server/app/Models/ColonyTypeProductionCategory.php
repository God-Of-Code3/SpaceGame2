<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColonyTypeProductionCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'colony_type_id',
        'production_category_id'
    ];

    static public function getColumns()
    {
        $productionCategories = [];
        foreach (ProductionCategory::get() as $productionCategory) {
            $productionCategories[] = [
                'value' => $productionCategory->id,
                'label' => $productionCategory->runame
            ];
        }

        return [
            'production_category_id' => ['Категория дейтельности', 'select', $productionCategories]
        ];
    }
}
