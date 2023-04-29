<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use App\Models\Package;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        Package::factory()
            ->count(4)
            ->sequence(
                [
                    'stayType' => 'FB',
                    'roomType' => 'Standard',
                    'price' => '25000'
                ],
                [
                    'stayType' => 'FB',
                    'roomType' => 'Deluxe',
                    'price' => '40000'
                ],
                [
                    'stayType' => 'BB',
                    'roomType' => 'Standard',
                    'price' => '15000'
                ],
                [
                    'stayType' => 'BB',
                    'roomType' => 'Deluxe',
                    'price' => '25000'
                ]
            )
            ->create();

    }
}
