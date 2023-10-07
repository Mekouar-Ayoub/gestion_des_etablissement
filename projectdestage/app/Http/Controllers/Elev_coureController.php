<?php

namespace App\Http\Controllers;

use App\Models\Coure;
use App\Models\Elev_coure;
use App\Models\Membre;
use App\Models\Profe;
use DB;
use Illuminate\Http\Request;

class Elev_coureController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                "membre_id" => 'required',
                "coure_id" => 'required'
            ]
        );

        Elev_coure::create($data);
        return response()->json('the student has been added to the cour');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    //with members$query =

    public function DeleteEleveFromCours(string $id, string $idEleve) {
        $response = Elev_coure::where('coure_id','=',$id)->where('membre_id','=',$idEleve)->delete();
        return response()->json($response);
    }



}
