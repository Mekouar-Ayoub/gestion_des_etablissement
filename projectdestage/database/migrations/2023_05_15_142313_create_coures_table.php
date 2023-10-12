<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coures', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->float('prix_horaire');
            $table->boolean('etat')->default(0);
            $table->dateTime('debut_de_coure');
            $table->dateTime('fin_de_coure');
            $table->unsignedBigInteger('profe_id');
            $table->unsignedTinyInteger('groupe');
            $table->foreign('profe_id')->references('id')->on('profes')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coures');
    }
};
