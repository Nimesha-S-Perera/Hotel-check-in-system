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
        Schema::create('change_log_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('changeLogID');
            $table->foreign('changeLogID')->references('id')->on('change_logs');
            $table->string("property",20);
            $table->string("oldValue",200);
            $table->string("newValue",200);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('change_log_details');
    }
};
