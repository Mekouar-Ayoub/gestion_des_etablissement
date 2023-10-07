<?php

namespace App\Http\Controllers;

use App\Models\CompteEcole;


class CompteEcoleController extends Controller
{
    public function GetHistory(){
        $data = CompteEcole::with('eleve')->with('prof')->with('cour')->paginate(15);
        return response($data);
    }

    public function GetHistoryOneCours($id){
        $data = CompteEcole::all()->where('cour_id','=',$id)->paginate(15);
        return response($data);
    }

    public function GetHistoryOneEleve($id){
        $data = CompteEcole::all()->where('eleve_id','=',$id)->paginate(15);
        return response($data);
    }

    public function GetHistoryOneProf($id){
        $data = CompteEcole::all()->where('prof_id','=',$id)->paginate(15);
        return response($data);
    }

}
