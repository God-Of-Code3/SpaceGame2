<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRelationToSpaceObject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('space_objects', function (Blueprint $table) {
            $table->foreignId('space_object_id')->nullable();
            $table->float('dist');
            $table->float('angle');
            $table->float('period');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('space_objects', function (Blueprint $table) {
            //
        });
    }
}
