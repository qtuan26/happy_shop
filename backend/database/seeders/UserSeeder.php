<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;   // <-- thêm dòng này
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            ['id' => 1, 'email' => 'admin@shoes.com', 'password' => Hash::make('password'), 'role' => 'admin', 'created_at' => '2023-01-01 08:00:00'],
            ['id' => 2, 'email' => 'admin2@shoes.com', 'password' => Hash::make('password'), 'role' => 'admin', 'created_at' => '2023-01-15 09:00:00'],
            ['id' => 3, 'email' => 'employee1@shoes.com', 'password' => Hash::make('password'), 'role' => 'employee', 'created_at' => '2023-02-01 10:00:00'],
            ['id' => 4, 'email' => 'employee2@shoes.com', 'password' => Hash::make('password'), 'role' => 'employee', 'created_at' => '2023-03-01 10:00:00'],
            ['id' => 5, 'email' => 'employee3@shoes.com', 'password' => Hash::make('password'), 'role' => 'employee', 'created_at' => '2023-04-01 10:00:00'],
            ['id' => 6, 'email' => 'employee4@shoes.com', 'password' => Hash::make('password'), 'role' => 'employee', 'created_at' => '2023-05-01 10:00:00'],
            ['id' => 7, 'email' => 'employee5@shoes.com', 'password' => Hash::make('password'), 'role' => 'employee', 'created_at' => '2023-06-01 10:00:00'],
            ['id' => 8, 'email' => 'john@gmail.com', 'password' => Hash::make('password'), 'role' => 'customer', 'created_at' => '2024-01-10 11:00:00'],
            ['id' => 9, 'email' => 'sarah@gmail.com', 'password' => Hash::make('password'), 'role' => 'customer', 'created_at' => '2024-01-15 12:00:00'],
            ['id' => 10, 'email' => 'mike@gmail.com', 'password' => Hash::make('password'), 'role' => 'customer', 'created_at' => '2024-02-01 13:00:00'],
            ['id' => 11, 'email' => 'emily@gmail.com', 'password' => Hash::make('password'), 'role' => 'customer', 'created_at' => '2024-02-10 14:00:00'],
            ['id' => 12, 'email' => 'david@gmail.com', 'password' => Hash::make('password'), 'role' => 'customer', 'created_at' => '2024-03-01 15:00:00'],
            ['id' => 13, 'email' => 'lisa@gmail.com', 'password' => Hash::make('password'), 'role' => 'customer', 'created_at' => '2024-03-15 16:00:00'],
            ['id' => 14, 'email' => 'james@gmail.com', 'password' => Hash::make('password'), 'role' => 'customer', 'created_at' => '2024-04-01 17:00:00'],
            ['id' => 15, 'email' => 'anna@gmail.com', 'password' => Hash::make('password'), 'role' => 'customer', 'created_at' => '2024-04-10 18:00:00'],
        ]);
    
    }
}
