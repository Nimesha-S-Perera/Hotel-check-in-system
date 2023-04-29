<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
            'bookingID' => $this->bookingID,
            'packageID' => $this->packageID,
            'taxID' => $this->taxID,
            'total' => $this->total,
            'status' => $this->status,
            'discount' => $this->discount,
            'paymentDate' => $this->paymentDate,
        ];
    }
}
