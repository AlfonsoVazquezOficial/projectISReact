<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ActorsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => $this -> faker -> name(),
            'description' => $this -> faker -> paragraph(), 
            'project_id' => $this -> faker ->randomElement([1, 2, 3, 4, 5]),
        ];
    }
}
