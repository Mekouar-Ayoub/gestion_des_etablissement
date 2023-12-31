<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use Illuminate\Http\Request;
use stdClass;

class ControllerPublication extends Controller
{
    public function AjouterPublication(Request $request)
    {
        $request->validate([
            'description' => 'required',
            'titre'=> 'required'
        ]);

        $publication = new Publication();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $publication->image = $imageName;
        }

        if ($request->hasFile('vedeo')) {
            $vedeo = $request->file('vedeo');
            $vedeoName = time() . '.' . $vedeo->getClientOriginalExtension();
            $vedeo->move(public_path('vedeos'), $vedeoName);
            $publication->vedeo = $vedeoName;
        }

        $publication->description = $request->description;
        $publication->titre = $request->titre;
        $publication->save();

        return response()->json('Publication created successfully');
    }

    public function getPublication(){
        $publication = Publication::all() ;
        return response($publication);
    }

    public function GetOnePublication($id){
        $publication = Publication::find($id);
        return response($publication);
    }

    public function ModifyOnePublication(Request $request,$id){
        $request->validate([
            'description' => 'required',
        ]);

        $publication = Publication::find($id);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $publication->image = $imageName;
        }

        if ($request->hasFile('vedeo')) {
            $vedeo = $request->file('vedeo');
            $vedeoName = time() . '.' . $vedeo->getClientOriginalExtension();
            $vedeo->move(public_path('vedeos'), $vedeoName);
            $publication->vedeo = $vedeoName;
        }

        $publication->description = $request->description;
        $publication->save();
    }


}
