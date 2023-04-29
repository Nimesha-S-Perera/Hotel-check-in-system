<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GuestTest extends TestCase
{
    /**
     * A basic test example.
     */

    public function test_if_all_guests_can_view(): void
    {
        $response = $this->get('api/guests');
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }

    public function test_if_new_guest_can_be_added(): void
    {
        $response = $this->post('api/guest',[
            'name' => 'Nimesha Perera',
            'nic' => '123456789012',
            'contactNumber' => '0771234567',
        ]);
        $response->assertStatus(200);
    }

    public function test_if_guest_can_update(): void
    {
        $response = $this->put('api/guest/2',['name' => 'Nimesha Perera']);
        $response->assertStatus(200);
    }

    public function test_if_guest_can_delete(): void
    {
        $response = $this->delete('api/guest/3');
        $response->assertStatus(200);
    }

    public function test_if_exsting_guest_can_view(): void
    {
        $response = $this->get('api/guest/exist',[
            'nic' => '123456789012',
        ]);
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }
}
