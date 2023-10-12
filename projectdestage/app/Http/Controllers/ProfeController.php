<?php

namespace App\Http\Controllers;

use App\Models\CompteEcole;

use App\Models\CompteProf;
use App\Models\Profe;
use App\Http\Requests\ProfRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfeController extends Controller
{

    public function FindEleveWithCours($id){
        $prof = Profe::find($id)->with('coure');
        return response()->json($prof);
    }

    //TODO important solde is à rendre
    public function ProfeRegister(ProfRequest $request)
    {
        $request->validated();
        $passwordCreated = ''.$request->input('nom').'.'.$request->input('prenom').'485!';
        $profe = Profe::create([
            'nom' => $request->input('nom'),
            'prenom' => $request->input('prenom'),
            'tel' => $request->input('tel'),
            'email' => $request->input('email'),
             //password is Nom.prenom485!

            'password' => Hash::make($passwordCreated),
            'adress' => $request->input('adress'),
            'instrument' => $request->input('instrument'),
            'tarif' => $request->input('tarif'),
            'solde' => $request->input('solde'),
        ]);


        $historyProf = new CompteProf();
                $historyProf->type='le professeur a été créer';
                $historyProf->prof_id = $profe->id;
                $historyProf->coure_id = -1;
                $historyProf->type_de_paiement='solde initial';
                $historyProf->nombre_heures=0;
                $historyProf->prix_a_rendre = $request->input('solde');
                $historyProf->profit = 0;
                $historyProf->save();

                $compteEcole = new CompteEcole();
                $compteEcole->mouvement = -$request->input('solde');
                $compteEcole->profit = 0;
                $compteEcole->cour_id = -1;
                $compteEcole->prof_id = $profe->id;
                $compteEcole->eleve_id = -1;
                $compteEcole->type_de_paiement = "solde initial";
                if(CompteEcole::latest()->first())
                $compteEcole->solde = CompteEcole::latest()->first()->solde-$request->input('solde');
                else {
                    $compteEcole->solde=-$request->input('solde');
                }
                $compteEcole->type='le professeur a été créer';
                $compteEcole->save();
        $profe->save();


        if ($profe) {
            return response()->json([$profe, 'status' => true]);
        } else {
            return response()->json(['status' => false]);
        }
    }

    //update prfe

    public function UpdateProfe(Request $request, $id)
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
        $prof = Profe::find($id);
        $prof->solde -= $request->input('solde');


                $prof->save();
        if (!$prof) {
            return response()->json(['message' => 'Member not found'], 404);
        }
        $prof->update($validatedData);

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
        if (!$token = auth()->guard('profe-api')->attempt($credentials)) {

            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $login_response = new \stdClass();
        $login_response->token=$token;
        $login_response->id = auth()->guard('profe-api')->user()->id;
        return $login_response;
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

    public function UpdateProfeSolde(Request $request, $id)
    {
        $validatedData = $request->validate([
            'solde'=>'required',
            'type_de_paiement'=>'required'
        ]);

        $prof = Profe::find($id);

        if (!$prof) {
            return response()->json(['message' => 'Member not found'], 404);
        }
        if($validatedData){

                $prof->solde -= $request->input('solde');
                $historyProf = new CompteProf();
                $historyProf->type='le professeur a été payé';
                $historyProf->prof_id = $prof->id;
                $historyProf->coure_id = -1;
                $historyProf->nombre_heures=0;
                $historyProf->prix_a_rendre = -$request->input('solde');
                $historyProf->type_de_paiement = $request->input('type_de_paiement');
                $historyProf->profit = 0;
                $historyProf->save();

                $compteEcole = new CompteEcole();
                $compteEcole->mouvement = -$request->input('solde');
                $compteEcole->profit = 0;
                $compteEcole->cour_id = -1;
                $compteEcole->prof_id = $prof->id;
                $compteEcole->eleve_id = -1;
                $compteEcole->type_de_paiement = $request->input('type_de_paiement');
                if(CompteEcole::latest()->first())
                $compteEcole->solde = CompteEcole::latest()->first()->solde-$request->input('solde');
                else {
                    $compteEcole->solde=-$request->input('solde');
                }
                $compteEcole->type='le professeur a été payé';
                $compteEcole->save();

                $prof->save();
                /*
            } catch(Exception $e) {
                return response()->json(['message' => 'error in function '], 404);
            }
            */
        }

    }
}
