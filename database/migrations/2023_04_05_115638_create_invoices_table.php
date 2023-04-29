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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('bookingID');
            $table->foreign('bookingID')->references('id')->on('bookings');
            $table->unsignedBigInteger('packageID');
            $table->foreign('packageID')->references('id')->on('packages');
            $table->unsignedFloat('tax')->nullable();
            $table->foreign('tax')->references('taxRate')->on('taxes');
            $table->float("discount")->nullable();
            $table->float("total");
            $table->dateTime('paymentDate', $precision = 0)->nullable();
            $table->enum('status', [0 => 'Paid', 1 => 'Unpaid'])->nullable()->default(null)->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
