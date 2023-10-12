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
            $table->integer('cour_id')->default(-1);
            $table->integer('prof_id')->default(-1);
            $table->integer('eleve_id')->default(-1);
            $table->float('profit');
            $table->string('type_de_paiement');
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
