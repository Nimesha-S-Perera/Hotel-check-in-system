<?php

namespace Database\Seeders;

use App\enums\RoleTypeEnums;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::factory()
            ->count(4)
            ->sequence(
                [
                    'roleType' => RoleTypeEnums::superAdmin,
                ],
                [
                    'roleType' => RoleTypeEnums::admin,
                ],
                [
                    'roleType' => RoleTypeEnums::supervisor,
                ],
                [
                    'roleType' => RoleTypeEnums::officer,
                ]
            )
            ->create();
    }
}
