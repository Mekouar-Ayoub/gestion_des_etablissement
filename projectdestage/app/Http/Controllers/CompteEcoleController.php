<?php

namespace App\Http\Controllers;

use App\Models\CompteEcole;


class CompteEcoleController extends Controller
{
    public function GetHistory(){
        $data = CompteEcole::with('eleve')->with('prof')->with('cour')->orderBy('created_at')->get()->toArray();
        return response($data);
    }

    public function GetHistoryOneCours($id){
        $data = CompteEcole::all()->orderBy('created_at')->where('cour_id','=',$id)->toArray();
        return response($data);
    }

    public function GetHistoryOneEleve($id){
        $data = CompteEcole::all()->orderBy('created_at')->where('eleve_id','=',$id)->toArray();
        return response($data);
    }

    public function GetHistoryOneProf($id){
        $data = CompteEcole::all()->orderBy('created_at')->where('prof_id','=',$id)->toArray();
        return response($data);
    }

}
