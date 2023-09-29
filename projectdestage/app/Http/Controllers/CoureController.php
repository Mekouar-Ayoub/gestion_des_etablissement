<?php

namespace App\Http\Controllers;

use App\Models\Coure;
use App\Http\Requests\CoureRequest;
use stdClass;

class CoureController extends Controller
{


    public function AjouterCoure(CoureRequest $request)
    {
        $request->validated();
        $coure = new Coure();
        $coure->titre = $request->input('titre');
        $coure->prix_horaire = $request->input('prix_horaire');
        $coure->debut_de_coure = $request->input('debut_de_coure');
        $coure->fin_de_coure = $request->input('fin_de_coure');
        $coure->profe_id = $request->input('profe_id');
        $coure->save();
        return response()->json($coure->save());
    }

    public function GetAllCours(){

        $data = Coure::with('membres')->with('profe')->paginate(15);
        //$data = Elev_coure::with('eleves')->paginate(15);
        return response()->json($data);
    }


}
