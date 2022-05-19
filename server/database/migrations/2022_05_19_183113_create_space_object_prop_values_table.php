<?php

use App\Models\SpaceObject;
use App\Models\SpaceObjectPropType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpaceObjectPropValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('space_object_prop_values', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(SpaceObject::class);
            $table->foreignIdFor(SpaceObjectPropType::class);
            $table->string("value");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('space_object_prop_values');
    }
}
