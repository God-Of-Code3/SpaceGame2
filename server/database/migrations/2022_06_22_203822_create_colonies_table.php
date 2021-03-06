<?php

use App\Models\ColonyType;
use App\Models\SpaceObject;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColoniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('colonies', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string("name");
            $table->foreignIdFor(SpaceObject::class);
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
        Schema::dropIfExists('colonies');
    }
}
