<?php


// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_if_all_users_can_view(): void
    {
        $response = $this->get('api/users');
        $bookingsdetails = $response->json();
        dd($bookingsdetails);
        $response->assertStatus(200);
    }

    public function test_if_new_user_can_be_added(): void
    {
        $response = $this->post('api/user',[
            'name' => 'Nimesha Perera',
            'email' => 'Nimesha@gmail.com',
            'password' => 'wa23',
            'roleID' => 2,
            'status' => 'Active'
        ]);
        $response->assertStatus(200);
    }

    public function test_if_user_can_update(): void
    {
        $response = $this->put('api/user/2',['' => '']);
        $response->assertStatus(200);
    }

    public function test_if_user_can_delete(): void
    {
        $response = $this->delete('api/user/3');
        $response->assertStatus(200);
    }

    public function test_if_register_worked(): void
    {
        $response = $this->post('api/register',[
            'name' => 'nimesha sanki perera',
            'email' => 'nim@example.com',
            'password' => '123456',
            'roleID' => '1',
            'status' => '1'
        ]);
        $response->assertStatus(200);
    }

    public function test_if_login_worked(): void
    {
        $response = $this->post('api/login',[
            'employeeID' => '0003',
            'password' => '12345',
        ]);
       dd($response->original['access_token']);
       $response->assertStatus(200);
    }

    public function test_if_logout_worked(): void
    {
        $response = $this->post('api/logout');
        $response->assertStatus(200);
    }
}
