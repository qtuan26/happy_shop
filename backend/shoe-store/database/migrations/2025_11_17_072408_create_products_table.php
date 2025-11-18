<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('brands');
            $table->foreignId('category_id')->constrained('categories');
            $table->string('product_name',100)->nullable();
            $table->text('description')->nullable();
            $table->decimal('base_price',10,2)->nullable();
            $table->string('color',30)->nullable();
            $table->string('material',50)->nullable();
            $table->enum('gender',['Male','Female','Unisex'])->nullable();
            $table->date('date_added')->nullable();
            $table->boolean('is_active')->default(true);
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
