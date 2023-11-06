<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkCourRequest;
use App\Models\CompteEcole;
use App\Models\Coure;
use App\Http\Requests\CoureRequest;
use App\Models\Elev_coure;
use App\Models\CompteEleve;
use App\Models\CompteProf;
use App\Models\Membre;
use App\Models\Profe;
use stdClass;

class CoureController extends Controller
{

    public function FindEleveWithCours($id){

        //select * from membres INNER JOIN elev_coures on membres.id= elev_coures.membre_id inner join coures on elev_coures.coure_id = coures.id where membres.id=1;
        $cours = Membre::with('coure')->get()->toArray();
        return response()->json($cours);
    }


    public function AjouterCoure(CoureRequest $request)
    {
        $request->validated();
        $coure = new Coure();
        $coure->titre = $request->input('titre');
        $coure->prix_horaire = $request->input('prix_horaire');
        $coure->debut_de_coure = $request->input('debut_de_coure');
        $coure->fin_de_coure = $request->input('fin_de_coure');
        $coure->profe_id = $request->input('profe_id');
        $coure->individuel = $request->input('individuel');
        $coure->save();
        return response()->json(Coure::latest()->first()->id);
    }

    private function intToDate($DayOfWeekNumber) {
        switch($DayOfWeekNumber)
        {
           case 0 : return 1; break;
           case 1 : return 2; break;
           case 2 : return 3; break;
           case 3 : return 4; break;
           case 4 : return 5; break;
           case 5 : return 6; break;
           case 6 : return 0;
        }
    }

    private function dateToInt($DayOfWeekNumber) {
        switch($DayOfWeekNumber)
        {
           case 0 : return 1; break;
           case 1 : return 2; break;
           case 2 : return 3; break;
           case 3 : return 4; break;
           case 4 : return 5; break;
           case 5 : return 6; break;
           case 6 : return 0;
        }
    }


    public function AddMultipleCours(BulkCourRequest $request) {
        $request->validated();
        $coursIds = [];
        //debutperiode + nbr jour
        for($i = 0; $i<count($request->input('cours_times')); $i++) {
                $coure = new Coure();
                $coure->titre = $request->input('titre');
                $coure->prix_horaire = $request->input('prix_horaire');
                $coure->debut_de_coure = \Carbon\Carbon::parse($request->input('cours_times')[$i]['debut_de_cour'])->format('Y-m-d H:i:s');
                $coure->fin_de_coure = \Carbon\Carbon::parse($request->input('cours_times')[$i]['fin_de_cour'])->format('Y-m-d H:i:s');
                error_log($coure->debut_de_coure);
                error_log($coure->fin_de_coure);
                $coure->profe_id = $request->input('profe_id');
                $coure->save();
                array_push($coursIds,Coure::latest()->first()->id);
            }
        $eleves = $request->input('eleves');
        for($j=0; $j<count($coursIds);$j++){
            for($k=0; $k<count($eleves);$k++){
                $Elev_coure = new Elev_coure();
                $Elev_coure->membre_id = $eleves[$k]['id'];
                $Elev_coure->coure_id = $coursIds[$j];
                $Elev_coure->save();
            }
    }
}

    public function DeleteOneCours($id) {
        $b=Coure::destroy($id);
        return response()->json($b);
    }

    public function GetAllCoursWithEleves(){

        $data = Coure::with('membres')->with('profe')->orderBy('debut_de_coure')->get()->toArray();
        //$data = Elev_coure::with('eleves')-> ;
        return response()->json($data);
    }

    public function GetAllCoursOneEleve($id){
    //TODO NOT WORKING
        $data = Coure::with('membres')->get()->toArray();

        return response()->json($data);
    }

    public function GetOneCours($id) {
        $data = Coure::all()->find($id);
        return response()->json($data);
    }

    public function GetAllCours() {
        $data = Coure::with('membres')->with('profe')->orderBy('debut_de_coure')->paginate(15);
        //$data = Elev_coure::with('eleves')->paginate(1000);
        return response()->json($data);
    }


    public function GetCoursByIdWithEleve($id) {
        $data = Coure::with('membres')->find($id);
        return response()->json($data);
    }

    public function GetCoursByIdWithProf($id) {
        $data = Coure::with('profe')->find($id);
        return response()->json($data);
    }

    public function GetCoursOneProf($id) {
        $data = Coure::with('profe')->where('profe_id','=',$id);
        return response()->json($data);
    }



    //TODO check
    public function ModifyOneCours($id, CoureRequest $request) {
        //TODO ELEVE AJOUTE AU COURS ET COMPTE ELEVE A PAS CHANGER
        $request->validated();
        $coureIndb = Coure::find($id);
        $coure = $data = Coure::find($id);
        $coure->id = $request->input('id');
        $coure->titre = $request->input('titre');
        $coure->prix_horaire = $request->input('prix_horaire');
        $coure->debut_de_coure = $request->input('debut_de_coure');
        $coure->fin_de_coure = $request->input('fin_de_coure');
        $coure->profe_id = $request->input('profe_id');
        $coure->etat = $request->input('etat');

        if($coureIndb->etat == 2) {
            if($coure->etat != 2) {
                $soldeToAddFromEleve = 0;
                $soldeToRemoveToProf = 0;
                $soldeToRemoveToEcole = 0;

                //find eleves
                $debut = \Carbon\Carbon::parse($request->input('debut_de_coure'));
                $fin = \Carbon\Carbon::parse($request->input('fin_de_coure'));
                $diff_dates = $debut->diffInMinutes($fin);

                $soldeToRemoveToEcole = $coure->prix_horaire *$diff_dates /60;

                $soldeToAddFromEleve = $coure->prix_horaire *$diff_dates /60;
                $allElevesInCours = Elev_coure::all()->where('coure_id','=',$coure->id);

                //not working
                foreach ($allElevesInCours as $value){
                    $historyEleve = new CompteEleve();
                    $historyEleve->eleve_id = $value->id;
                    $historyEleve->cour_id = $coure->id;
                    $historyEleve->nombre_heures=$diff_dates /60;
                    $historyEleve->prix=-$soldeToAddFromEleve;
                    $historyEleve->type='cours annulé';
                    $historyEleve->type_de_paiement = '';
                    $historyEleve->save();
                    $eleve = Membre::find($historyEleve->eleve_id);
                    $eleve->solde += $soldeToAddFromEleve;
                    //
                    $eleve->update();
                    //here
                    $value->save();
                }

                $prof = Profe::find($coure->profe_id);

                $soldeToRemoveToProf = $prof->tarif * $diff_dates /60;

                $prof->solde -=$soldeToRemoveToProf;
                $prof->update();

                $historyProf = new CompteProf();
                $historyProf->prof_id = $prof->id;
                $historyProf->coure_id = $coure->id;
                $historyProf->nombre_heures=$diff_dates /60;
                $historyProf->prix_a_rendre = -$soldeToRemoveToProf;
                $historyProf->type='cours annulé ou programmé';
                $historyProf->type_de_paiement='';
                $historyProf->profit = 0;
                $historyProf->save();


                $compteEcole = new CompteEcole();
                $compteEcole->mouvement = -$soldeToRemoveToEcole;
                $compteEcole->profit = 0;
                $compteEcole->cour_id = $coure->id;
                $compteEcole->type_de_paiement="";
                $LastSolde = CompteEcole::all()->last()->solde;

                $compteEcole->solde = $LastSolde-$soldeToRemoveToEcole;
                $compteEcole->type= 'cours annulé ou programmé';
                $compteEcole->save();

                $coure->update();


            }
            else {

            }
        }

        if($coureIndb->etat != 2) {
            if($coure->etat === 2) {
                $soldeToRemoveFromEleve = 0;
                $soldeToAddToProf = 0;
                $soldeToAddToEcole = 0;

                //find eleves

                $debut = \Carbon\Carbon::parse($request->input('debut_de_coure'));
                $fin = \Carbon\Carbon::parse($request->input('fin_de_coure'));
                $diff_dates = $debut->diffInMinutes($fin);



                $soldeToRemoveFromEleve = $coure->prix_horaire *$diff_dates /60;
                $allElevesInCours = Elev_coure::all()->where('coure_id','=',$coure->id);

                //not working
                foreach ($allElevesInCours as $value){
                    $historyEleve = new CompteEleve();
                    $historyEleve->eleve_id = $value->id;
                    $historyEleve->cour_id = $coure->id;
                    $historyEleve->nombre_heures=$diff_dates /60;
                    $historyEleve->prix=$soldeToRemoveFromEleve;
                    $historyEleve->type="l'éleve a effectué un cours";
                    $historyEleve->type_de_paiement = '';
                    $historyEleve->save();
                    $soldeToAddToEcole += $soldeToRemoveFromEleve;
                    $eleve = Membre::find($historyEleve->eleve_id);
                    $eleve->solde -= $soldeToRemoveFromEleve;
                    $eleve->update();
                    //here
                    $value->save();
                }

                $prof = Profe::find($coure->profe_id);

                $soldeToAddToProf = $prof->tarif * $diff_dates /60;

                $prof->solde +=$soldeToAddToProf;
                $prof->update();

                $historyProf = new CompteProf();
                $historyProf->prof_id = $prof->id;
                $historyProf->coure_id = $coure->id;
                $historyProf->nombre_heures=$diff_dates /60;
                $historyProf->prix_a_rendre = $soldeToAddToProf;
                $historyProf->profit = $soldeToAddToEcole - $soldeToAddToProf;
                $historyProf->type= 'a effectué un cours';
                $historyProf->type_de_paiement="";
                $historyProf->save();

                $compteEcole = new CompteEcole();
                $compteEcole->mouvement = $soldeToAddToEcole;
                $compteEcole->profit = $soldeToAddToEcole - $soldeToAddToProf;
                $compteEcole->cour_id = $coure->id;
                $compteEcole->type_de_paiement="";
                $LastSolde = CompteEcole::all()->last()->solde;

                $compteEcole->solde = $LastSolde + $soldeToAddToEcole;
                $compteEcole->type = 'un cours a été effectué';
                $compteEcole->save();

                $coure->update();
            }
        }



        return response()->json($data);
    }


}
