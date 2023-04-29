<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomWithGuestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
        return [
            'roomNo' => $this->roomNo,
            'roomType' => $this->roomType,
            'status' => $this->status,
            'checkInDate'=>$this->checkInDate,
            'checkOutDate'=>$this->checkOutDate,
            'stayType'=>$this->stayType,
            'guest' => $this->when($this->status == "1", [
                'name' => $this->name,
                'nic' => $this->nic,
                'contactNumber' => $this->contactNumber
            ], null)
        ];

        /*
          $guest = null;

        if ($this->status == "1" && $this->bookings->isNotEmpty()) {
            $guest = [
                'name' => $this->bookings->first()->guest ? $this->bookings->first()->guest->name : null,
                'nic' => $this->bookings->first()->guest ? $this->bookings->first()->guest->nic : null,
                'contactNumber' => $this->bookings->first()->guest ? $this->bookings->first()->guest->contactNumber : null,
            ];
        }

        return [
            'roomNo' => $this->roomNo,
            'roomType' => $this->roomType,
            'status' => $this->status,
            'checkInDate' => $this->bookings->isNotEmpty() ? $this->bookings->first()->checkInDate : null,
            'checkOutDate' => $this->bookings->isNotEmpty() ? $this->bookings->first()->checkOutDate : null,
            'stayType' => $this->bookings->isNotEmpty() ? $this->bookings->first()->stayType : null,
            'guest' => $guest,
        ];
        */

    }
}
