<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->count(4)
            ->sequence(
                [
                    'employeeID' => 'EMP-0001',
                    'name' => 'Nimesha Perera',
                    'contactNumber' => '0771234567',
                    'roleID' => '1',
                    'status' => '0',
                    'password' => Hash::make('123'),
                ],
                [
                    'employeeID' => 'EMP-0002',
                    'name' => 'Jathursha Perera',
                    'contactNumber' => '0773467896',
                    'roleID' => '2',
                    'status' => '0',
                    'password' => Hash::make('1234'),
                ],
                [
                    'employeeID' => 'EMP-0003',
                    'name' => 'Mehara Perera',
                    'contactNumber' => '0771647437',
                    'roleID' => '3',
                    'status' => '0',
                    'password' => Hash::make('12345'),
                ],

                [
                    'employeeID' => 'EMP-0004',
                    'name' => 'Bhagya Perera',
                    'contactNumber' => '0778636478',
                    'roleID' => '4',
                    'status' => '0',
                    'password' => Hash::make('123456'),
                ],
                [
                    'employeeID' => 'EMP-0005',
                    'name' => 'Sanki Perera',
                    'contactNumber' => '0778636478',
                    'roleID' => '4',
                    'status' => '1',
                    'password' => Hash::make('123'),
                ]

            )
            ->create();

        //User::factory()->count(6)->create();
    }
}
