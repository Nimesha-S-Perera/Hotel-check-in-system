<?php

namespace Database\Seeders;

use App\Models\Operation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OperationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Operation::factory()
            ->count(4)
            ->sequence(
                [
                    'description' => 'Check in',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'description' => 'Rooms',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'description' => 'Suite',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'description' => 'User',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ]
            )
            ->create();
    }
}
