<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;   // <-- thêm dòng này

use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('coupons')->insert([
            ['coupon_id' => 1, 'coupon_code' => 'WELCOME10', 'description' => '10% off for new customers', 'discount_type' => 'percentage', 'discount_value' => 10.00, 'min_purchase_amount' => 50.00, 'usage_limit' => 100, 'start_date' => '2024-01-01', 'end_date' => '2024-12-31', 'is_active' => 1],
            ['coupon_id' => 2, 'coupon_code' => 'SAVE20', 'description' => '$20 off on orders over $150', 'discount_type' => 'fixed_amount', 'discount_value' => 20.00, 'min_purchase_amount' => 150.00, 'usage_limit' => 50, 'start_date' => '2024-01-01', 'end_date' => '2024-12-31', 'is_active' => 1],
            ['coupon_id' => 3, 'coupon_code' => 'SUMMER25', 'description' => '25% off summer sale', 'discount_type' => 'percentage', 'discount_value' => 25.00, 'min_purchase_amount' => 100.00, 'usage_limit' => 200, 'start_date' => '2024-06-01', 'end_date' => '2024-08-31', 'is_active' => 1],
            ['coupon_id' => 4, 'coupon_code' => 'WINTER15', 'description' => '15% off winter collection', 'discount_type' => 'percentage', 'discount_value' => 15.00, 'min_purchase_amount' => 80.00, 'usage_limit' => 150, 'start_date' => '2024-12-01', 'end_date' => '2025-02-28', 'is_active' => 1],
            ['coupon_id' => 5, 'coupon_code' => 'FREESHIP', 'description' => 'Free shipping on orders over $100', 'discount_type' => 'fixed_amount', 'discount_value' => 10.00, 'min_purchase_amount' => 100.00, 'usage_limit' => 500, 'start_date' => '2024-01-01', 'end_date' => '2024-12-31', 'is_active' => 1],
            ['coupon_id' => 6, 'coupon_code' => 'FLASH30', 'description' => '30% flash sale', 'discount_type' => 'percentage', 'discount_value' => 30.00, 'min_purchase_amount' => 200.00, 'usage_limit' => 30, 'start_date' => '2024-11-01', 'end_date' => '2024-11-30', 'is_active' => 1],
            ['coupon_id' => 7, 'coupon_code' => 'NEWYEAR50', 'description' => '$50 off New Year special', 'discount_type' => 'fixed_amount', 'discount_value' => 50.00, 'min_purchase_amount' => 250.00, 'usage_limit' => 100, 'start_date' => '2024-12-25', 'end_date' => '2025-01-10', 'is_active' => 1],
            ['coupon_id' => 8, 'coupon_code' => 'STUDENT20', 'description' => '20% student discount', 'discount_type' => 'percentage', 'discount_value' => 20.00, 'min_purchase_amount' => 75.00, 'usage_limit' => 300, 'start_date' => '2024-01-01', 'end_date' => '2024-12-31', 'is_active' => 1],
            ['coupon_id' => 9, 'coupon_code' => 'VIP35', 'description' => '35% VIP member exclusive', 'discount_type' => 'percentage', 'discount_value' => 35.00, 'min_purchase_amount' => 300.00, 'usage_limit' => 50, 'start_date' => '2024-01-01', 'end_date' => '2024-12-31', 'is_active' => 1],
            ['coupon_id' => 10, 'coupon_code' => 'EASTER15', 'description' => '$15 off Easter sale', 'discount_type' => 'fixed_amount', 'discount_value' => 15.00, 'min_purchase_amount' => 120.00, 'usage_limit' => 200, 'start_date' => '2024-03-25', 'end_date' => '2024-04-10', 'is_active' => 0],
        ]);
    }
}
