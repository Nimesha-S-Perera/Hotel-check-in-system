<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChangeLogTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_if_all_change_logs_can_view(): void
    {
        $response = $this->get('api/changeLogs');
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }
}
