<?php

namespace App\Http\Controllers;

use App\Models\CompteEcole;
use App\Models\CompteEleve;
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
    public function store(Request $request, $id)
    {
        $data = $request->validate(
            [
                "membre_id" => 'required',
                "coure_id" => 'required'
            ]
        );

        //TODO working ?

        $cour = Coure::find($id);
        if($cour->etat == 2) {

            $debut = \Carbon\Carbon::parse($cour->debut_de_coure);
            $fin = \Carbon\Carbon::parse($cour->fin_de_coure);
            $diff_dates = $debut->diffInMinutes($fin);
            $mouvement = $cour->prix_horaire *$diff_dates /60;


            $compte_eleve=CompteEleve::find($request->input('membre_id'));
            $compte_eleve = new CompteEleve();
            $compte_eleve->type_de_paiement = $request->input('type_de_paiement');
            $compte_eleve->eleve_id = $request->input('membre_id');
            $compte_eleve->cour_id = $request->input('coure_id');
            $compte_eleve->nombre_heures= $diff_dates /60;
            $compte_eleve->prix=+$mouvement;
            $compte_eleve->type='eleve a été affecté à un cours effectué';
            $compte_eleve->save();


            $prof = Profe::find($cour->profe_id);

            $compte_ecole= new CompteEcole();
            $compte_ecole->mouvement = +$mouvement;
            $compte_ecole->type_de_paiement = "";
            $compte_ecole->profit = $mouvement - $prof->tarif * $diff_dates /60  ;
            $compte_ecole->cour_id = $cour->id;
            $LastSolde = CompteEcole::all()->last()->solde;
            $compte_ecole->solde = $LastSolde+$mouvement;
            $compte_ecole->type= 'cours annulé ou programmé';
            $compte_ecole->save();
            $eleve=Membre::find($request->input('membre_id'));
            $eleve->solde -= $cour->mouvement;
        }



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
