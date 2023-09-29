<?php

namespace App\Http\Controllers;

use App\Models\Profe;
use App\Http\Requests\ProfRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfeController extends Controller
{
    public function ProfeRegister(ProfRequest $request)
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
        $profe->tarif = $request->input('tarif');
        $profe->solde = $request->input('solde');
        $profe->token = Hash::make($request->input('tel'));
        error_log($profe);
        $profe->save();
        if ($profe) {
            return response()->json([$profe, 'status' => true]);
        } else {
            return response()->json(['status' => false]);
        }
    }

    //update prfe

    public function updateProfe(Request $request, $id)
    {
        // Validate the input data based on your requirements
        $validatedData = $request->validate([
            'nom'=>'required',
            'prenom'=>'required',
            'tel',
            'email'=>'required',
            'adress'=>'required',
            'instrument'=>'required',
            'tarif'=>'required',
            'solde'=>'required',
        ]);
        $membre = Profe::find($id);
        if (!$membre) {
            return response()->json(['message' => 'Member not found'], 404);
        }
        $membre->update($validatedData);

        return response()->json(['message' => 'Member updated successfully']);
    }

    //show all profs
    public function ShowProfe()
    {
        $data = Profe::all();
        return response()->json($data);
    }

    public function find($id)
    {
        $data = Profe::with('cours')->find($id);
        return response()->json($data);
    }

    public function ProfeLogin(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (! $token = auth()->guard('profe-api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $token;
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function me()
    {
        return response()->json(auth()->guard('profe-api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function logout()
    {
        auth()->guard('profe-api')->logout();

        return response()->json(['message' => 'Successfully logged out profe']);
    }


}
