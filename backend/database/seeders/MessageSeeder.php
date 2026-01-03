<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;   // <-- thêm dòng này

use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
         DB::table('messages')->insert([
            // Conversation 1
            ['message_id' => 1, 'conversation_id' => 1, 'sender_id' => 8, 'message' => 'Hi, I need help with sizing for Nike shoes.', 'type' => 'text', 'created_at' => '2024-03-10 14:01:00'],
            ['message_id' => 2, 'conversation_id' => 1, 'sender_id' => 3, 'message' => 'Hello! I would be happy to help. What is your usual shoe size?', 'type' => 'text', 'created_at' => '2024-03-10 14:02:00'],
            ['message_id' => 3, 'conversation_id' => 1, 'sender_id' => 8, 'message' => 'I usually wear size 42.', 'type' => 'text', 'created_at' => '2024-03-10 14:03:00'],
            ['message_id' => 4, 'conversation_id' => 1, 'sender_id' => 3, 'message' => 'Nike typically runs true to size. Size 42 should work perfectly for you.', 'type' => 'text', 'created_at' => '2024-03-10 14:05:00'],
            // Conversation 2
            ['message_id' => 5, 'conversation_id' => 2, 'sender_id' => 9, 'message' => 'Do you have this in stock?', 'type' => 'text', 'created_at' => '2024-06-15 09:31:00'],
            ['message_id' => 6, 'conversation_id' => 2, 'sender_id' => 4, 'message' => 'Yes, we have it available. Which size do you need?', 'type' => 'text', 'created_at' => '2024-06-15 09:35:00'],
            ['message_id' => 7, 'conversation_id' => 2, 'sender_id' => 9, 'message' => 'Size 43 please', 'type' => 'text', 'created_at' => '2024-06-15 09:36:00'],
            ['message_id' => 8, 'conversation_id' => 2, 'sender_id' => 4, 'message' => 'Perfect! We have size 43 in stock. Would you like to place an order?', 'type' => 'text', 'created_at' => '2024-06-15 09:38:00'],
            // Conversation 3
            ['message_id' => 9, 'conversation_id' => 3, 'sender_id' => 10, 'message' => 'What is your return policy?', 'type' => 'text', 'created_at' => '2024-05-05 10:16:00'],
            ['message_id' => 10, 'conversation_id' => 3, 'sender_id' => 5, 'message' => 'We offer 30-day returns for unworn items with original packaging.', 'type' => 'text', 'created_at' => '2024-05-05 10:18:00'],
            ['message_id' => 11, 'conversation_id' => 3, 'sender_id' => 10, 'message' => 'Great! Thank you for the information.', 'type' => 'text', 'created_at' => '2024-05-05 10:20:00'],
            // Conversation 4
            ['message_id' => 12, 'conversation_id' => 4, 'sender_id' => 11, 'message' => 'Can I use multiple coupons on one order?', 'type' => 'text', 'created_at' => '2024-05-20 11:46:00'],
            ['message_id' => 13, 'conversation_id' => 4, 'sender_id' => 3, 'message' => 'Unfortunately, only one coupon can be applied per order.', 'type' => 'text', 'created_at' => '2024-05-20 11:48:00'],
            ['message_id' => 14, 'conversation_id' => 4, 'sender_id' => 11, 'message' => 'I understand. Thanks!', 'type' => 'text', 'created_at' => '2024-05-20 11:50:00'],
            // Conversation 5
            ['message_id' => 15, 'conversation_id' => 5, 'sender_id' => 12, 'message' => 'How long does shipping take?', 'type' => 'text', 'created_at' => '2024-06-25 13:31:00'],
            ['message_id' => 16, 'conversation_id' => 5, 'sender_id' => 6, 'message' => 'Standard shipping takes 3-5 business days. Express shipping is 1-2 days.', 'type' => 'text', 'created_at' => '2024-06-25 13:33:00'],
            ['message_id' => 17, 'conversation_id' => 5, 'sender_id' => 12, 'message' => 'Perfect, I will go with standard shipping.', 'type' => 'text', 'created_at' => '2024-06-25 13:35:00'],
            // Conversation 6
            ['message_id' => 18, 'conversation_id' => 6, 'sender_id' => 13, 'message' => 'Is there a student discount available?', 'type' => 'text', 'created_at' => '2024-07-10 14:21:00'],
            ['message_id' => 19, 'conversation_id' => 6, 'sender_id' => 4, 'message' => 'Yes! Use code STUDENT20 for 20% off orders over $75.', 'type' => 'text', 'created_at' => '2024-07-10 14:23:00'],
            ['message_id' => 20, 'conversation_id' => 6, 'sender_id' => 13, 'message' => 'Awesome! Thank you so much!', 'type' => 'text', 'created_at' => '2024-07-10 14:25:00'],
            // Conversation 7
            ['message_id' => 21, 'conversation_id' => 7, 'sender_id' => 14, 'message' => 'Do these shoes run large or small?', 'type' => 'text', 'created_at' => '2024-08-15 15:51:00'],
            ['message_id' => 22, 'conversation_id' => 7, 'sender_id' => 7, 'message' => 'Which model are you looking at?', 'type' => 'text', 'created_at' => '2024-08-15 15:53:00'],
            ['message_id' => 23, 'conversation_id' => 7, 'sender_id' => 14, 'message' => 'The New Balance 574', 'type' => 'text', 'created_at' => '2024-08-15 15:54:00'],
            ['message_id' => 24, 'conversation_id' => 7, 'sender_id' => 7, 'message' => 'The 574 runs true to size. Order your normal size.', 'type' => 'text', 'created_at' => '2024-08-15 15:56:00'],
            // Conversation 8
            ['message_id' => 25, 'conversation_id' => 8, 'sender_id' => 15, 'message' => 'Can I change my shipping address?', 'type' => 'text', 'created_at' => '2024-08-30 16:31:00'],
            ['message_id' => 26, 'conversation_id' => 8, 'sender_id' => 5, 'message' => 'If your order has not shipped yet, yes! What is your order number?', 'type' => 'text', 'created_at' => '2024-08-30 16:33:00'],
            ['message_id' => 27, 'conversation_id' => 8, 'sender_id' => 15, 'message' => 'Order #10', 'type' => 'text', 'created_at' => '2024-08-30 16:35:00'],
            ['message_id' => 28, 'conversation_id' => 8, 'sender_id' => 5, 'message' => 'Let me check that for you.', 'type' => 'text', 'created_at' => '2024-08-30 16:36:00'],
            ['message_id' => 29, 'conversation_id' => 8, 'sender_id' => 5, 'message' => 'Your order has already shipped, but you can contact the carrier to change the delivery address.', 'type' => 'text', 'created_at' => '2024-08-30 16:38:00'],
            ['message_id' => 30, 'conversation_id' => 8, 'sender_id' => 15, 'message' => 'Okay, thank you for checking!', 'type' => 'text', 'created_at' => '2024-08-30 16:40:00'],
        ]);
    }
}
