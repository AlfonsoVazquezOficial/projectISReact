<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectsController extends Controller
{
    //
    public function index()
    {
        $projects = Project::paginate(10);
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $data = $request->json()->all();
        $project = new Project();


        $project->name = $data['name'];
        $project->description = $data['description'];
        $project->dateCreated = $data['dateCreated'];
        $project->save();
        /*
        */


        return response()->json(['message' => ($project)]);
    }

    public function destroy($id) {
        $project = Project::find($id);

        if ($project) {
            $project->delete();
            return response()->json(['message' => 'Project deleted successfully']);
        } else {
            return response()->json(['message' => 'Project not found'], 404);
        }
    }

    public function show($id) {
        return view('projects.showProject');
    }

    public function showProject($id) {
        $project = Project::find($id);
        return response()->json($project);
    }

    public function editProject(Request $request, $id) {
        $project = Project::find($id);
        $data = $request->json()->all();
        $project->name = $data['name'];
        $project->description = $data['description'];
        $project -> save();
        return response()->json(['message' => ($project)]);
    }
}
