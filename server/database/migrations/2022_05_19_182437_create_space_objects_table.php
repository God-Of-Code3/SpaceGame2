<?php

use App\Models\SpaceObjectType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpaceObjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('space_objects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string("name");
            $table->foreignIdFor(Universe::class);
            $table->float("x", 20, 8);
            $table->float("y", 20, 8);
            $table->float("rad", 20, 8);
            $table->foreignIdFor(SpaceObjectType::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('space_objects');
    }
}
