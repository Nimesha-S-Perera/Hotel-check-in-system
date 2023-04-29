<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoomTest extends TestCase
{
    /**
     * A basic test example.
     */

    //To view all rooms
    public function test_if_all_rooms_can_view(): void
    {
        $response = $this->get('api/rooms');
        $rooms = $response->json();
        dd($rooms);
        $response->assertStatus(200);
    }

    //To view available room with correct room suite
    public function test_if_all_available_rooms_with_correct_room_suite_can_view(): void
    {
        $response = $this->get('api/rooms/available',[
            'roomType' => 'Deluxe',
        ]);
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }


    public function test_if_new_room_can_be_added(): void{
        $response = $this->post('api/room', [
            'roomNo' => 44,
            'roomType' => 'Deluxe',
            'status' => 'Available',
        ]);

        $response->assertStatus(200);

    }

    //To update the room status after check out
    public function test_if_room_status_can_update_after_check_out(): void
    {
        $response = $this->post('api/update/rooms',[
            'roomNo' => '11',
        ]);
        $response->assertStatus(200);
    }

    public function test_if_room_can_delete(): void
    {
        $response = $this->delete('api/room/3');
        $response->assertStatus(200);
    }

}
