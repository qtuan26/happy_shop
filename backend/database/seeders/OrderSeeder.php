<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;   // <-- thêm dòng này

use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('orders')->insert([
            ['order_id' => 1, 'customer_id' => 1, 'order_date' => '2024-03-15 10:30:00', 'total_amount' => 265.00, 'tax_amount' => 26.50, 'discount_amount' => 13.90, 'payment_method' => 'Credit Card', 'status' => 'completed'],
            ['order_id' => 2, 'customer_id' => 2, 'order_date' => '2024-04-20 14:15:00', 'total_amount' => 190.00, 'tax_amount' => 19.00, 'discount_amount' => 0.00, 'payment_method' => 'PayPal', 'status' => 'completed'],
            ['order_id' => 3, 'customer_id' => 3, 'order_date' => '2024-05-10 09:45:00', 'total_amount' => 405.00, 'tax_amount' => 40.50, 'discount_amount' => 20.00, 'payment_method' => 'Credit Card', 'status' => 'completed'],
            ['order_id' => 4, 'customer_id' => 4, 'order_date' => '2024-05-25 16:20:00', 'total_amount' => 320.00, 'tax_amount' => 32.00, 'discount_amount' => 40.00, 'payment_method' => 'Credit Card', 'status' => 'completed'],
            ['order_id' => 5, 'customer_id' => 5, 'order_date' => '2024-06-05 11:30:00', 'total_amount' => 150.00, 'tax_amount' => 15.00, 'discount_amount' => 0.00, 'payment_method' => 'Cash on Delivery', 'status' => 'completed'],
            ['order_id' => 6, 'customer_id' => 6, 'order_date' => '2024-06-18 13:45:00', 'total_amount' => 540.00, 'tax_amount' => 54.00, 'discount_amount' => 60.00, 'payment_method' => 'Credit Card', 'status' => 'completed'],
            ['order_id' => 7, 'customer_id' => 7, 'order_date' => '2024-07-02 10:15:00', 'total_amount' => 275.00, 'tax_amount' => 27.50, 'discount_amount' => 0.00, 'payment_method' => 'PayPal', 'status' => 'completed'],
            ['order_id' => 8, 'customer_id' => 8, 'order_date' => '2024-07-20 15:30:00', 'total_amount' => 385.00, 'tax_amount' => 38.50, 'discount_amount' => 15.00, 'payment_method' => 'Credit Card', 'status' => 'completed'],
            ['order_id' => 9, 'customer_id' => 1, 'order_date' => '2024-08-10 14:00:00', 'total_amount' => 220.00, 'tax_amount' => 22.00, 'discount_amount' => 25.00, 'payment_method' => 'PayPal', 'status' => 'completed'],
            ['order_id' => 10, 'customer_id' => 2, 'order_date' => '2024-08-25 09:30:00', 'total_amount' => 165.00, 'tax_amount' => 16.50, 'discount_amount' => 10.00, 'payment_method' => 'Credit Card', 'status' => 'completed'],
        ]);
    }
}
