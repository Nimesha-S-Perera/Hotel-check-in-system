<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChangeLogDetailTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_if_all_change_log_details_can_view(): void
    {
        $response = $this->get('api/changeLogDetails');
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }
}
