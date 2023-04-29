<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'guests';
    use HasFactory;
    public $timestamps = false;
    public function bookings()
    {
        return $this->hasMany('App\Models\booking');
    }

    protected $fillable = [
        'name',
        'nic',
        'contactNumber',
    ];
}
