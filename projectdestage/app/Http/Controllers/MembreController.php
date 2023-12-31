<?php


namespace App\Http\Controllers;

use App\Models\CompteEcole;
use App\Models\CompteEleve;

use App\Models\Famille;
use App\Models\Membre;
use App\Http\Requests\MembreRequest;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use stdClass;
use Auth;

class MembreController extends Controller
{

    public function GetAllEleves()
    {
        $eleves = Membre::all();
        return response()->json($eleves);
    }
    public function GetAllElevesWithFamilles(){
        $eleves = Membre::with('famille')->get();
        return response()->json($eleves);
    }
    public function AddMembre(MembreRequest $request)
    {
        $data = $request->validated();
        $createdCount = 0;

        foreach ($data as $item) {
            //password is Nom.prenom485!
            $password = ''.$item['nom'].'.'.$item['prenom'].'753!';
            $eleveCree = Membre::create([
                'nom' => $item['nom'],
                'prenom' => $item['prenom'],
                'tel' => $item['tel'],
                'email' => $item['email'],
                'password' => Hash::make($password),
                'adresse' => $item['adresse'],
                'solde' => $item['solde'],
                'famille_id' => $item['famille_id'],
                'etudient' => $item['isEleve'],
                'type' => $item['type'],
            ]);
            $createdCount++;

            if($item['isEleve'] == 1){

                $historyEleve = new CompteEleve();
                $historyEleve->type="l'eleve a été créer";
                $historyEleve->eleve_id = $eleveCree->id;
                $historyEleve->cour_id = -1;
                $historyEleve->nombre_heures = 0;
                $historyEleve->prix = $eleveCree->solde;
                $historyEleve->type_de_paiement = "solde initial";
                $historyEleve->save();

                $compteEcole = new CompteEcole();
                $compteEcole->mouvement = $eleveCree->solde;
                $compteEcole->profit = 0;
                $compteEcole->cour_id = -1;
                $compteEcole->prof_id = -1;
                $compteEcole->type_de_paiement="solde initial";
                $compteEcole->eleve_id = $eleveCree->id;
                if(CompteEcole::latest()->first())
                    $compteEcole->solde = CompteEcole::latest()->first()->solde+$eleveCree->solde;
                else {
                        $compteEcole->solde=$eleveCree->solde;
                    }
                $compteEcole->type="l'eleve a été créer";
                $compteEcole->save();
            }
        }

        if ($createdCount > 0) {
            return response()->json(['created_count' => $createdCount, 'status' => true]);
        } else {
            return response()->json(['status' => false]);
        }
    }



    public function updateMember(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nom'=>'required',
            'prenom'=>'required',
            'tel'=>'required',
            'email'=>'required | email',
            'adresse'=>'required',
            'solde'=>'required',
            'famille_id'=>'required',
            'etudient'=>'required',
            'type'=>'required',
        ]);

        $membre = Membre::find($id);
        if (!$membre) {
            return response()->json(['message' => 'Member not found'], 404);
        }
        $membre->update($validatedData);

        return response()->json(['message' => 'Member updated successfully']);
    }

    public function updateMemberFromMemberProfile(Request $request, $id)
    {
        //TODO ecole doesn't change
        $validatedData = $request->validate([
            'nom'=>'required',
            'prenom'=>'required',
            'email'=>'required | email',
            'ecole' => 'required'
        ]);

        $membre = Membre::find($id);
        if (!$membre) {
            return response()->json(['message' => 'Member not found'], 404);
        }
        $membre->update($validatedData);

        return response()->json(['message' => 'Member updated successfully']);
    }


    public function Findmember($id)
    {
        $membre = Membre::find($id);
        return response()->json($membre);
    }

    public function FindEleveWithFamille($id)
    {
        //->where('','',$id)
        $membre = Membre::all()->find($id)->with('famille')->get();
        //error_log($membre);
        $famille = Famille::with('members')->find($membre[0]->famille_id);
        return response()->json($famille->members);
    }

    public function MemberLogin(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->guard('membre-api')->attempt($credentials)) {

            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $login_response = new stdClass();
        $login_response->token=$token;
        $login_response->id = auth()->guard('membre-api')->user()->id;
        return $login_response;

    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function me()
    {
        return response()->json(auth()->guard('membre-api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out member']);
    }

    public function updateEleveSolde(Request $request, $id)
    {
        $validatedData = $request->validate([
            'solde'=>'required',
            'type_de_paiement'=>'required'
        ]);

        if($validatedData) {
            $eleve = Membre::find($id);

            if (!$eleve) {
                return response()->json(['message' => 'Member not found'], 404);
            }
            $eleve->solde += $request->input('solde');
            $historyEleve = new CompteEleve();
            $historyEleve->type="l'eleve a payé";
            $historyEleve->eleve_id = $eleve->id;
            $historyEleve->cour_id = -1;
            $historyEleve->nombre_heures = 0;
            $historyEleve->type_de_paiement = $request->input('type_de_paiement');
            $historyEleve->prix = $request->input('solde');
            $historyEleve->save();

            $compteEcole = new CompteEcole();
            $compteEcole->mouvement = -$request->input('solde');
            $compteEcole->profit = 0;
            $compteEcole->cour_id = -1;
            $compteEcole->prof_id = -1;
            $compteEcole->eleve_id = $eleve->id;
            $compteEcole->type_de_paiement = $request->input('type_de_paiement');
            if(CompteEcole::latest()->first())
                $compteEcole->solde = CompteEcole::latest()->first()->solde-$request->input('solde');
            else {
                    $compteEcole->solde=-$request->input('solde');
                }
            $compteEcole->type="l'eleve a payé";
            $compteEcole->save();

            $eleve->save();
        }
    }



}
