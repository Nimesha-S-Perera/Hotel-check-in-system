<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'bookings';
    use HasFactory;

    public function room()
    {
        return $this->belongsTo('App\Models\room','roomID' );
    }

    public function guest()
    {
        return $this->belongsTo('App\Models\guest','guestID');
    }

    public $timestamps = false;
    protected $fillable = [
        'roomID',
        'guestID',
        'userID',
        'checkInDate',
        'checkOutDate',
        'actualCheckOutDate',
        'stayType',
    ];


}
