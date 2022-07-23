<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePruebaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prueba', function (Blueprint $table) {
            $table->integer('pr_id');
            $table->integer('codigo');
            $table->string('nombre');
            $table->boolean('confirmar');
            $table->integer('edad');
            $table->char('tipo',4);
            $table->bigInteger('biginteger');
            $table->date('fecha');
            $table->smallInteger('estado');
            $table->dateTime('fecha2');
            $table->timestamps();
            $table->unsignedBigInteger('lab_opa_id');
            $table->primary(['pr_id','codigo']);
            $table->foreign('lab_opa_id')->references('opa_id')->on('laboratorio');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prueba');
    }
}
