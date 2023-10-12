<?php

namespace App\Http\Controllers;

use App\Models\CompteProf;


class CompteProfController extends Controller
{

    //TODO working ?
    public function GetHistoryProf(){
        $data = CompteProf::all()->where('id','>','0');
        //::with('prof')->with('cour')
        //->withTrashed()
        return response()->json($data);
    }

    //WORKING
    public function GetHistoryOneProf($id){
        $data = CompteProf::all()->where('prof_id','=',$id);
        return response()->json($data);
    }
}
