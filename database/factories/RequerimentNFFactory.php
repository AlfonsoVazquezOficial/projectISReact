<?php

namespace Database\Factories;

use App\Models\RequerimentNF;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RequerimentNF>
 */
class RequerimentNFFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = RequerimentNF::class;
    public function definition(): array
    {
        return [
            //
            'name' => $this -> faker -> name(),
            'description' => $this -> faker -> paragraph(), 
            'label' => $this -> faker -> randomElement(["RNF-".random_int($min = 1, $max = 100)]),
            'project_id' => $this -> faker ->randomElement([1, 2, 3, 4, 5]),
            'isUsed' => false,
        ];
    }
}
