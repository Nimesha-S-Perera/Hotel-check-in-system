<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceDetailResource extends JsonResource
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
            'invoiceID' => $this->invoiceID,
            'quantity' => $this->quantity,
            'description' => $this->description,
            'unitPrice' => $this->unitPrice,
            'total' => $this->total,
        ];
    }
}
