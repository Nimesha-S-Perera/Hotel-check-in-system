<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class InvoiceTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_if_all_invoices_can_view(): void
    {
        $response = $this->get('api/invoices');
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }

    public function test_if_invoice_can_add(): void
    {
        $response = $this->post('api/add/invoice',[
            'bookingID' => '1',
            'packageID' => '1',
            'taxID' => '1',
            'total' => '50000',
            'paymentDate' => '2023-03-27 11:28:41',
        ]);
        $response->assertStatus(200);
    }

    public function test_if_invoice_can_delete(): void
    {
        $response = $this->delete('api/invoice/3');
        $response->assertStatus(200);
    }
}
