<?php

namespace App\Http\Controllers;

use App\Models\HistoryProf;


class HistoryProfController extends Controller
{

    //TODO working ?
    public function GetHistoryProf(){
        //hadi ma khedamach
        $data = HistoryProf::find(1);
        //::with('prof')->with('cour')
        //->withTrashed()
        return response()->json($data);

    }

    //TODO not working
    public function GetHistoryOneProf($id){
        $data = HistoryProf::all()->where('prof_id','=',$id);
        return response()->json($data);
    }
}
