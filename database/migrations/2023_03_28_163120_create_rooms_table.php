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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id("roomNo");
            //0 => 'Standard', 1 => 'Deluxe'
            $table->tinyInteger('roomType');
            //0 => 'Available', 1 => 'Booked'
            $table->tinyInteger('status');
            $table->tinyInteger('outoforder')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
