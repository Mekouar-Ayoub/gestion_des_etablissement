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

Route::post('admins/login', [AdminController::class, 'AdminLogin']);
Route::post('register',[AdminController::class,'AdminRegister']);
Route::group(['middleware' => 'admin:admin-api'], function () {
    Route::get('admins',[AdminController::class,'me']);
    Route::post('logout',[AdminController::class,'logout']);
});

// profe

Route::post('profs/Login', [ProfeController::class, 'ProfeLogin']);

Route::group(['middleware' => 'profe:profe-api'], function () {
    Route::put('profs/{id}', [ProfeController::class, 'updateProfe']);
    Route::get('profs/me', [ProfeController::class, 'me']);
    Route::post('profs/logout', [ProfeController::class,'logout']);

});

// membre

Route::get('eleves', [MembreController::class, 'GetAllEleves']);
Route::post('eleves/login', [MembreController::class, 'MemberLogin']);
Route::get('eleves/{id}', [MembreController::class,'Findmember']);
Route::put('eleves/{id}', [MembreController::class,'updateMember']);
Route::group(['middleware' => 'member:membre-api'], function () {
    Route::get('member', [MembreController::class, 'me']);
    Route::post('logoutprofe', [MembreController::class,'logout']);
});

// rouets des membre
Route::post('eleves', [MembreController::class, 'AddMembre']);


// route des familles
Route::get('families', [FamilleController::class, 'index']);
Route::get('families/{id} ', [FamilleController::class, 'show']);
Route::post('families', [FamilleController::class, 'store']);
Route::put('families/{id}', [FamilleController::class, 'UpdateFamille']);
Route::delete('families/{id} ', [FamilleController::class, 'DeleteFamille']);

// route des profe

Route::post('profs', [ProfeController::class, 'ProfeRegister']);
Route::post('profs/{id}', [ProfeController::class, 'find']);
Route::get('profs', [ProfeController::class,'ShowProfe']);


// route des publications
Route::post('publications', [ControllerPublication::class, 'AjouterPublication']);
Route::get('publications', [ControllerPublication::class, 'getPublication']);

// coure
Route::get('cours', [CoureController::class, 'GetAllCours']);
Route::post('cours', [CoureController::class, 'AjouterCoure']);

// table etudiant cours
Route::post('cours/{id}/eleves', [Elev_coureController::class, 'store']);
Route::get('cours/{id}', [Elev_coureController::class, 'GetCoursById']);
Route::get('cours/eleves', [Elev_coureController::class, 'GetAllCoursWithEleves']);


// Events
Route::get('events', [EventController::class, 'getallevent']);
Route::post('events', [EventController::class, 'ajouterEvent']);




