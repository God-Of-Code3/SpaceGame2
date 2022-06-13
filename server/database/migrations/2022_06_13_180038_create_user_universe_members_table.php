<?php

use App\Models\Universe;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserUniverseMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_universe_members', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->float('x', 20, 8);
            $table->float('y', 20, 8);
            $table->float('scale', 20, 8);
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Universe::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_universe_members');
    }
}
