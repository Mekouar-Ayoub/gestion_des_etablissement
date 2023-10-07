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
        Schema::create('historique_soldes_prof', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('prof_id');
            $table->foreign('prof_id')->references('id')->on('profes')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->integer('coure_id');
            $table->integer('nombre_heures');
            $table->float('prix_a_rendre');
            $table->float('profit');
            $table->string('type');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
