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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('coupon_code',50)->unique();
            $table->text('description')->nullable();
            $table->enum('discount_type',['percentage','fixed_amount']);
            $table->decimal('discount_value',10,2);
            $table->decimal('min_purchase_amount',10,2)->nullable();
            $table->decimal('max_discount_amount',10,2)->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('usage_limit')->nullable();
            $table->integer('times_used')->default(0);
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
        Schema::dropIfExists('coupons');
    }
};
