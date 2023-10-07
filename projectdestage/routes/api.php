<?php
use App\Http\Controllers\CompteEcoleController;
use App\Http\Controllers\HistoryEcoleController;
use App\Http\Controllers\HistoryEleveController;
use App\Http\Controllers\HistoryProfController;
use App\Models\HistoryEcole;
use App\Models\HistoryEleve;
use App\Models\HistoryProf;

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
Route::get('profs/{id}/cours', [ProfeController::class,'FindProfWithCours']);
//TODO accept only mp4 video
// membre

Route::get('eleves', [MembreController::class, 'GetAllEleves']);
Route::post('eleve/login', [MembreController::class, 'MemberLogin']);
Route::get('eleves/{id}', [MembreController::class,'Findmember']);
Route::put('eleves/{id}', [MembreController::class,'updateMember']);
//eleve a payé
Route::put('eleves/{id}/solde', [MembreController::class,'updateEleveSolde']);

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
Route::get('cours/eleves', [CoureController::class, 'GetAllCoursWithEleves']);
Route::get('cours/{id}', [CoureController::class, 'GetOneCours']);
Route::put('cours/{id}', [CoureController::class, 'ModifyOneCours']);
Route::get('cours/{id}/eleves', [CoureController::class, 'GetCoursByIdWithEleve']);
Route::get('cours/{id}/prof', [CoureController::class, 'GetCoursByIdWithProf']);



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

Route::get('profs/solde', [HistoryProfController::class, 'GetHistoryProf']);
Route::get('profs/{id}/solde', [HistoryProfController::class, 'GetHistoryOneProf']);


Route::get('eleves/solde', [HistoryEleveController::class, 'GetHistoryEleve']);
Route::get('eleves/{id}/solde', [HistoryEleveController::class, 'GetHistoryOneEleves']);

