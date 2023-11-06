<?php

namespace App\Http\Controllers;
use App\Models\CompteEleve;


class CompteEleveController extends Controller
{

    public function GetCompteEleve(){
        $data = CompteEleve::all()->orderBy('created_at');

        return response()->json($data);


    }

    public function GetHistoryOneEleve($id){
        $data = CompteEleve::all()->where('eleve_id','=',$id);
        return response()->json($data);
    }

}
