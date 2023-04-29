<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoomSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(PackageSeeder::class);
        $this->call(TaxSeeder::class);
        $this->call(GuestSeeder::class);
        $this->call(OperationSeeder::class);
        $this->call(PermissionSeeder::class);
        //$this->call(BookingSeeder::class);

    }
}
