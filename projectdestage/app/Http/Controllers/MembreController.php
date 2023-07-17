<?php

namespace App\Http\Controllers;

use App\Models\Membre;
use App\Http\Requests\MembreRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class MembreController extends Controller
{

    public function LoginMember(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if (Auth::guard('member')->attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
            $request->session()->regenerate();
            $data = Membre::where('email', $request->email)->get(['id','type']);
            return response($data);
        }
        return response()->json(false);
    }

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
            $password = '12345678';
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
