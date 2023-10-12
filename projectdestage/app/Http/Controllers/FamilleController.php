<?php

namespace App\Http\Controllers;

use App\Models\Famille;
use Illuminate\Http\Request;


class FamilleController extends Controller
{
    // function to show all famille
    public function index()
    {
        $familles = Famille::with('members')->paginate(15);
        return response()->json($familles);;
    }

    // function to show one famille
    public function show($id)
    {
        $famille = Famille::with('members')->find($id);

        if (!$famille) {
            return response()->json(['error' => 'Famille not found'], 404);
        }
        return response()->json($famille);
    }

    // function to create famille
    public function store(Request $request)
    {
        $message = 'created successfully';

        $data = $request->validate([
            'nom' => 'required'
        ]);
        $famille = Famille::create($data);
        return response()->json($famille->id);
    }

    // function to update famille
    public function UpdateFamille(Request $request, $id)
    {
        $request()->validate([
            'nom' => 'required'
        ]);
        $famille = Famille::find($id);
        $famille->update($request);
        return response()->json('true');
    }

    //function to delete famille
    public function DeleteFamille($id)
    {
        Famille::destroy($id);
        return response()->json('famille deleted');
    }
}
