<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\enums\RoleTypeEnums;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    public $timestamps = false;
    use HasApiTokens, HasFactory, Notifiable;

    public $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public function role(){
        return $this->belongsTo(Role::class ,'roleID');
    }
    protected $fillable = [
        'employeeID',
        'name',
        'contactNumber',
        'password',
        'roleID',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
/*
    public function isSuperAdmin(){
        return $this->role->roleType === RoleTypeEnums::superAdmin;
    }

    public function isAdmin(){
        return $this->role->roleType === RoleTypeEnums::admin;
    }

    public function isSupervisor(){
        return $this->role->roleType === RoleTypeEnums::supervisor;
    }

    public function isOfficer(){
        return $this->role->roleType === RoleTypeEnums::officer;
    }
*/
}


