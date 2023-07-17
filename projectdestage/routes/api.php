<?php


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

// admin
Route::post('login', [AdminController::class, 'LoginAdmin']);



// rouets des membre
Route::post('AddMembre', [MembreController::class, 'AddMembre']);
Route::post('updateMembre/{id}', [MembreController::class, 'updateMembre']);
Route::post('deleteMembre/{id}', [MembreController::class, 'deleteMembre']);
Route::get('ShowMembre', [MembreController::class, 'ShowMembre']);
Route::post('LoginMember', [MembreController::class, 'LoginMember']);

// route des familles
Route::get('toulFamille', [FamilleController::class, 'index']);
Route::get('showfamilles/{id} ', [FamilleController::class, 'show']);
Route::post('ajouterFamille', [FamilleController::class, 'store']);
Route::post('UpdateFamille/{id}', [FamilleController::class, 'UpdateFamille']);
Route::post('DeleteFamille/{id} ', [FamilleController::class, 'DeleteFamille']);

// route des profe
Route::post('profeLogin', [ProfeController::class, 'LoginProfe']);
Route::post('AjouterProfe', [ProfeController::class, 'AjouterProfe']);
Route::post('findProfe/{id}', [ProfeController::class, 'find']);
Route::get('showallprofe', [ProfeController::class,'ShowProfe']);

// route des publications
Route::post('Ajouterpublication', [ControllerPublication::class, 'AjouterPublication']);
Route::get('getPublication', [ControllerPublication::class, 'getPublication']);

// coure 
Route::get('toutlascoure', [CoureController::class, 'toutlascoure']);
Route::post('AjouterCoure', [CoureController::class, 'AjouterCoure']);


// Events
Route::get('getallevent', [EventController::class, 'getallevent']);
Route::post('ajouterEvent', [EventController::class, 'ajouterEvent']);

// Ajouter etudient to coure
Route::post('AddToCoure', [Elev_coureController::class, 'store']);
