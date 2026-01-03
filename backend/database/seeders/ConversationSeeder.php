<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;   // <-- thêm dòng này

use Illuminate\Database\Seeder;

class ConversationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
         DB::table('conversations')->insert([
            ['conversation_id' => 1, 'customer_id' => 1, 'employee_id' => 1, 'status' => 'closed', 'created_at' => '2024-03-10 14:00:00'],
            ['conversation_id' => 2, 'customer_id' => 2, 'employee_id' => 2, 'status' => 'open', 'created_at' => '2024-06-15 09:30:00'],
            ['conversation_id' => 3, 'customer_id' => 3, 'employee_id' => 3, 'status' => 'closed', 'created_at' => '2024-05-05 10:15:00'],
            ['conversation_id' => 4, 'customer_id' => 4, 'employee_id' => 1, 'status' => 'closed', 'created_at' => '2024-05-20 11:45:00'],
            ['conversation_id' => 5, 'customer_id' => 5, 'employee_id' => 4, 'status' => 'open', 'created_at' => '2024-06-25 13:30:00'],
            ['conversation_id' => 6, 'customer_id' => 6, 'employee_id' => 2, 'status' => 'closed', 'created_at' => '2024-07-10 14:20:00'],
            ['conversation_id' => 7, 'customer_id' => 7, 'employee_id' => 5, 'status' => 'open', 'created_at' => '2024-08-15 15:50:00'],
            ['conversation_id' => 8, 'customer_id' => 8, 'employee_id' => 3, 'status' => 'closed', 'created_at' => '2024-08-30 16:30:00'],
        ]);
    }
}
