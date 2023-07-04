<?php

namespace App\Http\Controllers;

use App\Models\RequerimentF;
use App\Models\RequerimentNF;
use Illuminate\Http\Request;

class RequerimentsController extends Controller
{
    //
    public function main() {
        return view('projects.requeriments');
    }

    public function indexRF($idProject) {
        $rfs = RequerimentF::where('project_id', '=', $idProject) -> paginate(5);
        return response() -> json($rfs);
    }

    public function indexRFAll($idProject) {
        $rfs = RequerimentF::where('project_id', '=', $idProject) -> get();
        return response() -> json($rfs);
    }

    public function indexRNF($idProject) {
        $rnfs = RequerimentNF::where('project_id', '=', $idProject) -> paginate(5);
        return response() -> json($rnfs);
    }

    public function getRequerimentById($idReq) {
        $rf = RequerimentF::where('id', '=', $idReq) -> get();
        return response() -> json($rf);
    }

    public function create() {
        return view('projects.createRequeriment');
    }

    public function storeFunctional(Request $request) {
        $data = $request->json()->all();
        $requeriment = new RequerimentF();

        $requeriment -> name = $data['name'];
        $requeriment -> description = $data['description'];
        $requeriment -> project_id = $data['project_id'];
        $requeriment -> label = $data['label'];
        $requeriment -> save();

        $requeriment -> label = "RF-".($requeriment -> id);
        $requeriment -> save();
        return response()->json(['message' => ($requeriment)]);
    }

    public function storeNFunctional(Request $request) {
        $data = $request->json()->all();
        $requeriment = new RequerimentNF();

        $requeriment -> name = $data['name'];
        $requeriment -> description = $data['description'];
        $requeriment -> project_id = $data['project_id'];
        $requeriment -> label = $data['label'];
        $requeriment -> save();

        $requeriment -> label = "RNF-".($requeriment -> id);
        $requeriment -> save();
        return response()->json(['message' => ($requeriment)]);
        
    }

    public function destroyF($id) {
        $requeriment = RequerimentF::find($id);

        if ($requeriment) {
            $requeriment->delete();
            return response()->json(['message' => 'Requeriment deleted successfully']);
        } else {
            return response()->json(['message' => 'Project not found'], 404);
        }
    }

    public function destroyNF($id) {
        $requeriment = RequerimentNF::find($id);

        if ($requeriment) {
            $requeriment->delete();
            return response()->json(['message' => 'Requeriment deleted successfully']);
        } else {
            return response()->json(['message' => 'Project not found'], 404);
        }
    }

    public function editRequerimentF(Request $request, $id) {
        $project = RequerimentF::find($id);
        $data = $request->json()->all();
        $project->name = $data['name'];
        $project->description = $data['description'];
        $project -> save();
        return response()->json(['message' => ($project)]);
    }

    public function editRequerimentFUseCase(Request $request, $id) {
        $project = RequerimentF::find($id);
        $data = $request->json()->all();
        $project->name = $data['name'];
        $project->description = $data['description'];
        $project -> caseUse_id = $data['caseUse_id'];
        $project -> save();
        return response()->json(['message' => ($project)]);
    }

    public function editRequerimentNF(Request $request, $id) {
        $project = RequerimentNF::find($id);
        $data = $request->json()->all();
        $project->name = $data['name'];
        $project->description = $data['description'];
        $project -> save();
        return response()->json(['message' => ($project)]);
    }
}
