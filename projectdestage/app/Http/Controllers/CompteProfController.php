<?php

namespace App\Http\Controllers;

use App\Models\CompteProf;


class CompteProfController extends Controller
{

    public function GetHistoryProf(){
        $data = CompteProf::all()->where('id','>','0')->sortBy('created_at');
        return response()->json($data);
    }

    public function GetHistoryOneProf($id){
        //TODO order by nor working
        $data = CompteProf::all()->where('prof_id','=',$id)->sortBy('created_at');
        return response()->json($data);
    }
}
