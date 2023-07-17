<?php

namespace App\Http\Controllers;

use App\Models\Profe;
use Illuminate\Http\Request;
use App\Http\Requests\ProfRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfeController extends Controller
{
    //show all profs
    public function ShowProfe()
    {
        $data = Profe::all();
        return response()->json($data);
    }
    // loing profe 
    public function LoginProfe(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if (Auth::guard('Profe')->attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
            $request->session()->regenerate();
            $data = Profe::where('email', $request->email)->get(['id', 'type','token']);
            return response($data);
        }
        return response()->json(false);
    }
    //get one profe
    public function find($id)
    {
        $data = Profe::where('id', $id)->get();
        return $data;
    }
    // creation des profe
    public function AjouterProfe(ProfRequest $request)
    {
        $request->validated();
        $profe = new Profe();
        $profe->nom = $request->input('nom');
        $profe->prenom = $request->input('prenom');
        $profe->tel = $request->input('tel');
        $profe->email = $request->input('email');
        $profe->password = Hash::make($request->input('password'));
        $profe->adress = $request->input('adress');
        $profe->instrument = $request->input('instrument');
        if ($request->hasFile('cv')) {
            $cv = $request->file('cv');
            $cvName = time() . '.' . $cv->getClientOriginalExtension();
            $cv->move(public_path('cvs'), $cvName);
            $profe->cv = $cvName;
        }
        $profe->tarif = $request->input('tarif');
        $profe->solde = $request->input('solde');
        $profe->token = Hash::make($request->input('tel')); 

        $profe->save();

        return response()->json('prof created successfully');
    }
}