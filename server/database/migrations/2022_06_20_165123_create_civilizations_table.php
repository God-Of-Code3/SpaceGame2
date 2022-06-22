<?php

use App\Models\Universe;
use App\Models\UserUniverseMember;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCivilizationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('civilizations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string("name");
            $table->foreignId('starting_planet_id')->references('id')->on('space_objects');

            $table->integer("level");
            $table->foreignIdFor(UserUniverseMember::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('civilizations');
    }
}
