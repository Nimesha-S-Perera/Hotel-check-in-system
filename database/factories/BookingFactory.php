<?php

namespace Database\Factories;

use App\Models\guest;
use App\Models\room;
use App\Models\user;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $available = null;
        $roomStatus = room::where('status',1)->pluck('roomNo');

        if($roomStatus->count() > 0){
            $available = $this->faker->unique()->randomElement($roomStatus);
        }

        return [
            'roomID' => $available,
            'guestID' => $this->faker->unique()->randomElement(guest::pluck('id')),
            'userID' => $this->faker->randomElement(user::pluck('id')),
            'checkInDate' => $this->faker->dateTimeBetween($startDate = '-1 days', $endDate = 'now', $timezone = null),
            'checkOutDate' => $this->faker->dateTimeBetween($startDate = '+2 days', $endDate = '+5 days', $timezone = null),
            'actualCheckOutDate' => $this->faker->dateTimeBetween($startDate = '+2 days', $endDate = '+5 days', $timezone = null),
            'stayType' => $this->faker->randomElement(['0', '1']),
        ];
    }
}
