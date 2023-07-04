<?php

namespace App\Http\Controllers;

use App\Models\Actors;
use Illuminate\Http\Request;

class ActorsController extends Controller
{
    //
    public function main() {
        return view('projects.actors');
    }

    public function index($idProject) {
        $actors = Actors::where('project_id', '=', $idProject) -> paginate(5);
        return response() -> json($actors);
    }

    public function destroy($id) {
        $actor = Actors::find($id);

        if ($actor) {
            $actor->delete();
            return response()->json(['message' => 'Actor deleted successfully']);
        } else {
            return response()->json(['message' => 'Actor not found'], 404);
        }
    }

    public function create() {
        return view('projects.createActor');
    }

    public function store(Request $request) {
        $data = $request->json()->all();
        $actor = new Actors();

        $actor -> name = $data['name'];
        $actor -> description = $data['description'];
        $actor -> project_id = $data['project_id'];
        $actor -> actor_id = $data['actor_id'];
        $actor -> save();
        return response()->json(['message' => ($actor)]);
    }

    public function edit(Request $request, $id) {
        $project = Actors::find($id);
        $data = $request->json()->all();
        $project->name = $data['name'];
        $project->description = $data['description'];
        $project -> save();
        return response()->json(['message' => ($project)]);
    }

    public function indexAll($idProject) {
        $rfs = Actors::where('project_id', '=', $idProject) -> get();
        return response() -> json($rfs);
    }
}
