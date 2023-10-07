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
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('membre_id');
            $table->foreign('membre_id')->references('id')->on('membres')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->unsignedBigInteger('coure_id');
            $table->foreign('coure_id')->references('id')->on('coures')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->integer('numbre_hours');
            $table->float('prix');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};
