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
        Schema::create('users', function (Blueprint $table) {
            $table->id('id',);
            $table->string('employeeID')->unique();
            $table->string("name",100);
            $table->string("contactNumber",20);
            $table->string('password',200);
            $table->unsignedBigInteger('roleID');
            $table->foreign('roleID')->references('id')->on('roles');
            $table->tinyInteger('status');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
