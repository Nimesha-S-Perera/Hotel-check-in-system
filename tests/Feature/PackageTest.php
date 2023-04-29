<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PackageTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_if_all_packages_can_view(): void
    {
        $response = $this->get('api/packages');
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }

    public function test_if_new_package_can_be_added(): void
    {
        $response = $this->post('api/package',[
            'stayType' => 'FB',
            'roomType' => 'Deluxe',
            'price' => 22000,
        ]);
        $response->assertStatus(200);
    }

    public function test_if_package_can_update(): void
    {
        $response = $this->put('api/package/2',['' => '']);
        $response->assertStatus(200);
    }

    public function test_if_package_can_delete(): void
    {
        $response = $this->delete('api/package/3');
        $response->assertStatus(200);
    }
}
