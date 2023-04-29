<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaxTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_if_all_taxes_can_view(): void
    {
        $response = $this->get('api/taxes');
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }

    public function test_if_new_tax_can_be_added(): void
    {
        $response = $this->post('api/tax',[
            'name' => 'GAT',
            'taxRate' => 20
        ]);
        $response->assertStatus(200);
    }

    public function test_if_tax_can_view(): void
    {
        $response = $this->get('api/tax');
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }

    public function test_if_package_can_update(): void
    {
        $response = $this->put('api/tax/2',['' => '']);
        $response->assertStatus(200);
    }

    public function test_if_tax_can_delete(): void
    {
        $response = $this->delete('api/tax/3');
        $response->assertStatus(200);
    }
}
