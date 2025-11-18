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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers');
            $table->timestamp('order_date')->useCurrent();
            $table->decimal('total_amount',10,2)->nullable();
            $table->decimal('tax_amount',10,2)->nullable();
            $table->decimal('discount_amount',10,2)->nullable();
            $table->enum('payment_method',['Cash','Credit Card','Debit Card','Online']);
            $table->enum('status',['Pending','Completed','Cancelled']);
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
