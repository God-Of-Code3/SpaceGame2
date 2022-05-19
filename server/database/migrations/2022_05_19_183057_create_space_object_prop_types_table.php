<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpaceObjectPropTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('space_object_prop_types', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string("name");
            $table->string("description");
            $table->string("runame");
            $table->string("default");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('space_object_prop_types');
    }
}
