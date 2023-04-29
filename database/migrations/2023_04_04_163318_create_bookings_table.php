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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('roomID');
            $table->foreign('roomID')->references('roomNo')->on('rooms');
            $table->unsignedBigInteger('guestID');
            $table->foreign('guestID')->references('id')->on('guests');
            //0 => 'FB', 1 => 'BB'
            $table->tinyInteger('stayType');
            $table->dateTime('checkInDate', $precision = 0);
            $table->dateTime('checkOutDate', $precision = 0);
            $table->dateTime('actualCheckOutDate', $precision = 0)->nullable();
            $table->unsignedBigInteger('userID');
            $table->foreign('userID')->references('id')->on('users');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
