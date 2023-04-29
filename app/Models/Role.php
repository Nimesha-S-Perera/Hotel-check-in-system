<?php

namespace App\Models;

use App\enums\RoleTypeEnums;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public $timestamps = false;
    use HasFactory;

    public function users(){
        return $this->hasMany(User::class,'roleID');
    }
    protected $fillable = [
        'roleType'
    ];

    protected $casts = [
        'roleType' => RoleTypeEnums::class
    ];

}
