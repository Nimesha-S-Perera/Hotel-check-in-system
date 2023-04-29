<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PermissionTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_if_permission_can_view(): void
    {
        $response = $this->post('api/permission',[
            'roleID' => '1',
            'operationID' => '1'
        ]);
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }

}
