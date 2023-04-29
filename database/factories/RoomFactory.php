<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'roomNo' => $this->faker->unique()->numberBetween(1,100),
            'roomType' => $this->faker->randomElement(['0','1']),
            'status' => $this->faker->randomElement(['0']),
            'roomType' => $this->faker->randomElement(['0', '1']),
            'status' => $this->faker->randomElement(['0']),
        ];
    }
}
