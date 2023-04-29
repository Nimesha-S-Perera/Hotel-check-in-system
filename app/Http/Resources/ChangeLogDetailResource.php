<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChangeLogDetailResource extends JsonResource
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
            'changeLogID' => $this->changeLogID,
            'property' => $this->property,
            'oldValue' => $this->oldValue,
            'newValue' => $this->newValue,
        ];
    }
}
