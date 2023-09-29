<?php


namespace App\Http\Controllers;

use App\Models\Membre;
use App\Http\Requests\MembreRequest;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class MembreController extends Controller
{

    public function GetAllEleves()
    {
        $eleves = Membre::all();
        return response()->json($eleves);
    }
    public function AddMembre(MembreRequest $request)
    {
        $data = $request->validated();
        $createdCount = 0;

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
            $createdCount++;
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


    public function Findmember($id)
    {
        $membre = Membre::find($id);
        return response()->json($membre);
    }

    public function MemberLogin(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->guard('membre-api')->attempt($credentials)) {
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
        return response()->json(auth()->guard('membre-api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function logout()
    {
        auth()->guard('membre-api')->logout();

        return response()->json(['message' => 'Successfully logged out member']);
    }
}
