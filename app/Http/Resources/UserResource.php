<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employeeID' => $this->employeeID,
            'name' => $this->name,
            'contactNumber' => $this->contactNumber,
            'roleID' => $this->roleID,
            'password' => $this->password,
        ];
    }
}
