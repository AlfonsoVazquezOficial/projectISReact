<?php

namespace App\Http\Controllers;

use App\Models\RequerimentF;
use App\Models\UseCase;
use Illuminate\Http\Request;

class UseCaseController extends Controller
{
    //
    public function main() {
        return view('projects.useCases');
    }

    public function create() {
        return view('projects.createUseCase');
    }

    public function index($idProject) {
        $useCases = UseCase::where('project_id', '=', $idProject) -> paginate(5);
        return response() -> json($useCases);
    }

    public function getRFByCaseUse($idCaseUse) {
        $rfs = RequerimentF::where('caseUse_id', '=', $idCaseUse) -> get();
        return response() -> json($rfs);
    }

    public function store(Request $request) {
        $data = $request->json()->all();
        $useCase = new UseCase();

        $useCase -> name = $data['name'];
        $useCase -> description = $data['description'];
        $useCase -> project_id = $data['project_id'];
        $useCase -> label = $data['label'];
        $useCase -> save();

        $useCase -> label = "CU-".($useCase -> id);
        $useCase -> save();
        return response()->json($useCase);
    }

    public function destroy($id) {
        $actor = UseCase::find($id);

        if ($actor) {
            $actor->delete();
            return response()->json(['message' => 'Actor deleted successfully']);
        } else {
            return response()->json(['message' => 'Actor not found'], 404);
        }
    }

    public function edit() {
        return view('projects.showUseCase');
    }

    public function getUseCaseById($id) {
        $actor = UseCase::find($id);

        if ($actor) {
            return response()->json($actor);
        } else {
            return response()->json(['message' => 'Actor not found'], 404);
        }
    }

    public function update(Request $request, $id) {
        $project = UseCase::find($id);
        $data = $request->json()->all();
        $project->name = $data['name'];
        $project->description = $data['description'];
        $project->actor_id = $data['actor_id'];

        $project -> save();
        return response()->json(['message' => ($project)]);
    }
}
