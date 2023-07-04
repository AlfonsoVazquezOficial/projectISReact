<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Actor;
use App\Models\Actors;
use App\Models\Project;
use App\Models\RequerimentF;
use App\Models\RequerimentNF;
use App\Models\UseCase;
use Database\Factories\ActorsFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        Project::factory(10) -> create();
        RequerimentF::factory(100) -> create();
        RequerimentNF::factory(100) -> create();
        Actors::factory(50) -> create();
        UseCase::factory(50) -> create();

    }
}
