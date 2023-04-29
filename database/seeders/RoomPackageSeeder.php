<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Room_Package;

class RoomPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Package::factory()
        // ->count(4)
        // ->sequence(
        //     [
        //         'stayType' => 'FB',
        //         'roomType' => 'Standard',
        //         'price' => '25000'
        //     ],
        //     [
        //         'stayType' => 'FB',
        //         'roomType' => 'Deluxe',
        //         'price' => '40000'
        //     ],
        //     [
        //         'stayType' => 'BB',
        //         'roomType' => 'Standard',
        //         'price' => '15000'
        //     ],
        //     [
        //         'stayType' => 'BB',
        //         'roomType' => 'Deluxe',
        //         'price' => '25000'
        //     ]
        // )
        // ->create();
        Room_Package::insert([
            [
        
                'roomType' => 'Standard',
                'stayType' => 'FB',
                'price' => 25000,
          
            ],
            [
      
                'roomType' => 'Standard',
                'stayType' => 'BB',
                'price' => 15000,

         
            ],
            [
          
                'roomType' => 'Deluxe',
                'stayType' => 'FB',
                'price' => 40000,

            ],
            [
          
                'roomType' => 'Deluxe',
                'stayType' => 'BB',
                'price' => 25000,

         
            ],
        ]);
    }
}
