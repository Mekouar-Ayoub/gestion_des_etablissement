<?php

namespace App\Http\Controllers;

use App\Models\Membre;
use App\Http\Requests\MembreRequest;
use Illuminate\Support\Facades\Hash;

class MembreController extends Controller
{
    // aficher les membre
    public function ShowMembre(){
        $data = Membre::with('famille')->paginate(15);
        return response($data);
    }
    //creat membre 
    public function AddMembre(MembreRequest $request)
    {
        $data = $request->validated();
        foreach ($data as $item) {
            $password = $item['nom'] . $item['tel'] . $item['adresse'];
            Membre::create([
                'nom' => $item['nom'],
                'prenom' => $item['prenom'],
                'tel' => $item['tel'],
                'email' => $item['email'],
                'password' => Hash::make($password),
                'adresse' => $item['adresse'],
                'solde' => $item['solde'],
                'famille_id' => $item['famille_id'],
                'etudient' => $item['etudient'],
                'type' => $item['type'],
            ]);
        }
    }
    // update member
    public function updateMembre(MembreRequest $request, $id)
    {
        $data = $request->validated();
        $membre = Membre::findOrFail($id);
        $membre->update($data);
        return response()->json('true');
    }

    // function delete membre
    public function deleteMembre($id)
    {
        $membre = Membre::findOrFail($id);
        $membre->delete();
        return response()->json('true');
    }
}
