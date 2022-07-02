<?php

use App\Models\ProductionCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductionBranchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('production_branches', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string("name");
            $table->foreignIdFor(ProductionCategory::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('production_branches');
    }
}
