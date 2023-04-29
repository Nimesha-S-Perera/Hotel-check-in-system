<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::factory()
            ->count(16)
            ->sequence(
                [
                    'roleID' => '1',
                    'operationID' => '1',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '1',
                    'operationID' => '2',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '1',
                    'operationID' => '3',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '1',
                    'operationID' => '4',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '2',
                    'operationID' => '1',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '2',
                    'operationID' => '2',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '2',
                    'operationID' => '3',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '2',
                    'operationID' => '4',
                    'access' => '1',
                    'create' => '0',
                    'update' => '0',
                    'delete' => '0',
                ],
                [
                    'roleID' => '3',
                    'operationID' => '1',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '3',
                    'operationID' => '2',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '3',
                    'operationID' => '3',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '3',
                    'operationID' => '4',
                    'access' => '0',
                    'create' => '0',
                    'update' => '0',
                    'delete' => '0',
                ],
                [
                    'roleID' => '4',
                    'operationID' => '1',
                    'access' => '1',
                    'create' => '1',
                    'update' => '1',
                    'delete' => '1',
                ],
                [
                    'roleID' => '4',
                    'operationID' => '2',
                    'access' => '0',
                    'create' => '0',
                    'update' => '0',
                    'delete' => '0',
                ],
                [
                    'roleID' => '4',
                    'operationID' => '3',
                    'access' => '0',
                    'create' => '0',
                    'update' => '0',
                    'delete' => '0',
                ],
                [
                    'roleID' => '4',
                    'operationID' => '4',
                    'access' => '0',
                    'create' => '0',
                    'update' => '0',
                    'delete' => '0',
                ]
            )
            ->create();
    }
}
