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
        Schema::create('membres', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('tel');
            $table->string('email');
            $table->string('password');
            $table->string('adresse');
            $table->string('ecole')->default('');
            $table->string('profession')->default('');
            $table->float('solde');
            $table->unsignedBigInteger('famille_id');
            $table->foreign('famille_id')->references('id')->on('familles')
                                         ->cascadeOnDelete()
                                         ->cascadeOnUpdate();
            $table->boolean('etudient')->default(0);
            $table->string('type');
            $table->string('rol')->default('member');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membres');
    }
};
