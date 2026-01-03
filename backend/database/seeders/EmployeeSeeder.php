<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;   // <-- thêm dòng này

use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('employees')->insert([
            ['employee_id' => 1, 'user_id' => 3, 'full_name' => 'Tom Manager', 'phone' => '0901111111', 'position' => 'Customer Support Manager', 'hire_date' => '2023-02-01'],
            ['employee_id' => 2, 'user_id' => 4, 'full_name' => 'Lisa Support', 'phone' => '0902222222', 'position' => 'Sales Representative', 'hire_date' => '2023-03-01'],
            ['employee_id' => 3, 'user_id' => 5, 'full_name' => 'Peter Johnson', 'phone' => '0903333333', 'position' => 'Customer Support', 'hire_date' => '2023-04-01'],
            ['employee_id' => 4, 'user_id' => 6, 'full_name' => 'Maria Garcia', 'phone' => '0904444444', 'position' => 'Sales Specialist', 'hire_date' => '2023-05-01'],
            ['employee_id' => 5, 'user_id' => 7, 'full_name' => 'Kevin Lee', 'phone' => '0905555555', 'position' => 'Technical Support', 'hire_date' => '2023-06-01'],
        ]);
    }
}
