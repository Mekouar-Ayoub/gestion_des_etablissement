<?php

namespace App\Http\Controllers;
use App\Models\CompteEleve;


class CompteEleveController extends Controller
{

    //TODO working ?
    public function GetCompteEleve(){
        $data = CompteEleve::all();

        return response()->json($data);


    }

    //TODO Not working
    public function GetHistoryOneEleve($id){
        $data = CompteEleve::all()->where('eleve_id','=',$id);
        return response()->json($data);
    }

}
