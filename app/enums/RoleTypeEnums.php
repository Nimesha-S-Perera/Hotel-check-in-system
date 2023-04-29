<?php

namespace App\enums;

enum RoleTypeEnums: int
{
    case superAdmin = 1;
    case admin = 2;
    case supervisor = 3;
    case officer = 4;

    public static function getDescription($roleType)
    {
        switch ($roleType) {
            case self::superAdmin:
                return 'Super Admin';
            case self::admin:
                return 'Admin';
            case self::supervisor:
                return 'Supervisor';
            case self::officer:
                return 'Officer';
            default:
                return '';
        }
    }

}
