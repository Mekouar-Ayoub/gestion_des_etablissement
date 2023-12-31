<?php
use App\Http\Controllers\CompteEcoleController;
use App\Http\Controllers\CompteEleveController;
use App\Http\Controllers\CompteProfController;


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CoureController;
use App\Http\Controllers\ProfeController;
use App\Http\Controllers\MembreController;
use App\Http\Controllers\FamilleController;
use App\Http\Controllers\ControllerPublication;
use App\Http\Controllers\EventController;
use App\Http\Controllers\Elev_coureController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Admin

Route::post('admins/login', [AdminController::class, 'AdminLogin']);
Route::post('register',[AdminController::class,'AdminRegister']);


Route::group(['middleware' => 'admin:admin-api'], function () {
    Route::get('admins',[AdminController::class,'me']);
    Route::post('admins/logout',[AdminController::class,'logout']);
});


// routes des profs
Route::post('prof/login', [ProfeController::class, 'ProfeLogin']);
Route::post('profs', [ProfeController::class, 'ProfeRegister']);
Route::get('profs/{id}', [ProfeController::class, 'find']);
Route::get('profs', [ProfeController::class,'ShowProfe']);
Route::put('profs/{id}', [ProfeController::class, 'UpdateProfe']);
Route::put('profs/{id}/solde', [ProfeController::class, 'UpdateProfeSolde']);
//TODO accept only mp4 video

// membre
Route::get('eleves', [MembreController::class, 'GetAllEleves']);
Route::get('familles/eleves', [MembreController::class, 'GetAllElevesWithFamilles']);
Route::post('eleve/login', [MembreController::class, 'MemberLogin']);
Route::get('eleves/{id}', [MembreController::class,'Findmember']);
Route::put('eleves/{id}', [MembreController::class,'updateMember']);
Route::put('eleves/{id}/self-modify', [MembreController::class,'updateMemberFromMemberProfile']);
//eleve a payé
Route::put('eleves/{id}/solde', [MembreController::class,'updateEleveSolde']);
Route::get('famille/eleves/{id}', [MembreController::class,'FindEleveWithFamille']);
//NOt working
Route::get('eleves/{id}/cours', [CoureController::class,'FindEleveWithCours']);



// rouets des membre
Route::post('eleves', [MembreController::class, 'AddMembre']);


// route des familles
Route::get('families', [FamilleController::class, 'index']);
Route::get('families/{id} ', [FamilleController::class, 'show']);
Route::post('families', [FamilleController::class, 'store']);
Route::put('families/{id}', [FamilleController::class, 'UpdateFamille']);
Route::delete('families/{id} ', [FamilleController::class, 'DeleteFamille']);



// route des publications
Route::post('publications', [ControllerPublication::class, 'AjouterPublication']);
Route::get('publications', [ControllerPublication::class, 'getPublication']);
Route::get('publications/{id}', [ControllerPublication::class, 'GetOnePublication']);
Route::put('publications/{id}', [ControllerPublication::class, 'ModifyOnePublication']);

// coure
Route::get('cours', [CoureController::class, 'GetAllCours']);
Route::post('cours', [CoureController::class, 'AjouterCoure']);
Route::post('cours/bulk', [CoureController::class, 'AddMultipleCours']);
Route::get('cours/eleves', [CoureController::class, 'GetAllCoursWithEleves']);
Route::get('cours/{id}', [CoureController::class, 'GetOneCours']);
Route::put('cours/{id}', [CoureController::class, 'ModifyOneCours']);
Route::delete('cours/{id}', [CoureController::class, 'DeleteOneCours']);
Route::get('cours/{id}/eleves', [CoureController::class, 'GetCoursByIdWithEleve']);
Route::get('cours/{id}/prof', [CoureController::class, 'GetCoursByIdWithProf']);
Route::get('cours/prof/{id}', [CoureController::class, 'GetCoursOneProf']);



// table etudiant cours
Route::post('cours/{id}/eleves', [Elev_coureController::class, 'store']);
Route::delete('cours/{id}/eleves/{idEleve}', [Elev_coureController::class, 'DeleteEleveFromCours']);

// Events
Route::get('events', [EventController::class, 'getallevent']);
Route::post('events', [EventController::class, 'ajouterEvent']);


//SOLDES
Route::get('/admin/ecole/solde', [CompteEcoleController::class, 'GetHistory']);
Route::get('/admin/ecole/solde/cours/{id}', [CompteEcoleController::class, 'GetHistoryOneCours']);
Route::get('/admin/ecole/solde/eleve/{id}', [CompteEcoleController::class, 'GetHistoryOneEleve']);
Route::get('/admin/ecole/solde/prof/{id}', [CompteEcoleController::class, 'GetHistoryOneProf']);

Route::get('solde/profs', [CompteProfController::class, 'GetHistoryProf']);
Route::get('profs/{id}/solde', [CompteProfController::class, 'GetHistoryOneProf']);


Route::get('solde/eleves', [CompteEleveController::class, 'GetCompteEleve']);
Route::get('/soldes/eleves/{id}', [CompteEleveController::class, 'GetHistoryOneEleve']);

