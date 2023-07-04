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
        Schema::create('requeriment_n_f_s', function (Blueprint $table) {
            
            $table -> id() -> autoIncrement();
            $table -> string('name');
            $table -> text('description');
            $table -> string('label');
            $table -> integer('project_id');
            $table -> boolean('isUsed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requeriment_n_f_s');
    }
};
