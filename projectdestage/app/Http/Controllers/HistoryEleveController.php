<?php

namespace App\Http\Controllers;



use App\Models\HistoryEleve;


class HistoryEleveController extends Controller
{

    //TODO working ?
    public function GetHistoryEleve(){
        $data = HistoryEleve::all()->paginate(15);
        if($data){
            return response($data);
        }
        else{
            return response()->json('vide');
        }
    }

    //TODO Not working
    public function GetHistoryOneEleve($id){
        $data = HistoryEleve::all()->where('eleve_id','=',$id)->paginate(15);
        return response()->json($data);
    }

}
