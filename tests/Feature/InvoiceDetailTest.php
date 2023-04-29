<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoiceDetailTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_if_all_invoice_details_can_view(): void
    {
        $response = $this->get('api/invoiceDetails');
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }

    public function test_if_new_invoice_details_can_be_added(): void
    {
        $response = $this->post('api/invoiceDetail',[
            'invoiceID' => 2,
            'description' => 'Lunch',
            'quantity' => 4,
            'unitPrice' => 1000,
            'total' => 4000
        ]);
        $response->assertStatus(200);
    }

    public function test_if_invoice_details_can_delete(): void
    {
        $response = $this->delete('api/invoiceDetails/3');
        $response->assertStatus(200);
    }
}
