<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class UseCaseFactory extends Factory
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
            'label' => $this -> faker -> randomElement(["CU-".random_int($min = 1, $max = 100)]),
            'project_id' => $this -> faker ->randomElement([1, 2, 3, 4, 5]),
            'actor_id' => $this -> faker ->randomElement([1, 2, 3, 4, 5]),
        ];
    }
}
