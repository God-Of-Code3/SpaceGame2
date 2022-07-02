<?php

use App\Models\ColonyType;
use App\Models\ProductionCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColonyTypeProductionCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('colony_type_production_categories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(ProductionCategory::class);
            $table->foreignIdFor(ColonyType::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('colony_type_production_categories');
    }
}
