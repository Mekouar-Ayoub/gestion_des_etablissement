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
        Schema::create('compte_ecole', function (Blueprint $table) {
            $table->id();
            $table->float('solde')->default(0);
            $table->float('mouvement');
            $table->integer('cour_id');
            $table->integer('prof_id');
            $table->integer('eleve_id');
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
