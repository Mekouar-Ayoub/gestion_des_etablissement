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
use App\Models\Admin;

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

Route::post('adminlogin', [AdminController::class, 'AdminLogin']);
Route::post('register',[AdminController::class,'AdminRegister']);
Route::group(['middleware' => 'admin:admin-api'], function () {
    Route::get('admin',[AdminController::class,'me']);
    Route::post('logout',[AdminController::class,'logout']);
});

// profe

Route::post('profeLogin', [ProfeController::class, 'ProfeLogin']);

Route::group(['middleware' => 'profe:profe-api'], function () {
    Route::get('findProfe/{id}', [ProfeController::class, 'find']);
    Route::post('updateProfe/{id}', [ProfeController::class, 'updateProfe']);
    Route::get('profe', [ProfeController::class, 'me']);
    Route::post('logoutprofe', [ProfeController::class,'logout']);
    
});

// membre

Route::post('memberLogin', [MembreController::class, 'MemberLogin']);
Route::get('findmember/{id}', [MembreController::class,'Findmember']);
Route::post('updatemember/{id}', [MembreController::class,'updateMember']);
Route::group(['middleware' => 'member:membre-api'], function () {
    Route::get('member', [MembreController::class, 'me']);
    Route::post('logoutprofe', [MembreController::class,'logout']);
});

// rouets des membre
Route::post('AddMembre', [MembreController::class, 'AddMembre']);


// route des familles
Route::get('toulFamille', [FamilleController::class, 'index']);
Route::get('showfamilles/{id} ', [FamilleController::class, 'show']);
Route::post('ajouterFamille', [FamilleController::class, 'store']);
Route::post('UpdateFamille/{id}', [FamilleController::class, 'UpdateFamille']);
Route::post('DeleteFamille/{id} ', [FamilleController::class, 'DeleteFamille']);

// route des profe

Route::post('AjouterProfe', [ProfeController::class, 'ProfeRegister']);
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
