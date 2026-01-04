<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;
    protected $primaryKey = 'coupon_id';

    protected $fillable = [
        'coupon_code',
        'description',
        'discount_type',
        'discount_value',
        'max_discount',
        'min_order_value',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function orders()
    {
        return $this->hasMany(OrderCoupon::class, 'coupon_id', 'coupon_id');
    }
}
