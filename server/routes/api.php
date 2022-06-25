<?php

use App\Http\Controllers\CivilizationController;
use App\Http\Controllers\ColonyTypeController;
use App\Http\Controllers\ColonyController;
use App\Http\Controllers\CRUDController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\SpaceObjectController;
use App\Http\Controllers\SpaceObjectTypeController;
use App\Http\Controllers\SpaceObjectPropTypeController;
use App\Http\Controllers\UniverseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserUniverseMemberController;
use App\Models\Role;
use App\Models\SpaceObject;
use App\Models\SpaceObjectType;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user_info', function (Request $request) {
    $userData = $request->user();
    $user = User::find($userData['id']);
    $role = Role::find($user['role_id']);
    $user['role'] = $role;
    return $user;
});


Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::get('/logout', [UserController::class, 'logout']);


Route::middleware('auth:sactum')->middleware('isadmin')->get('/getTables', [CRUDController::class, 'getTables'])->name('getTables');

// CRUD
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('universe', UniverseController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('space_object_type', SpaceObjectTypeController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('space_object_prop_type', SpaceObjectPropTypeController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('space_object', SpaceObjectController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('user', UserController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('user_universe_member', UserUniverseMemberController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('civilization', CivilizationController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('colony_type', ColonyTypeController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('colony', ColonyController::class);

Route::middleware('auth:sanctum')->middleware('isadmin')->get('get_record_columns/space_object/{spaceObject}', [SpaceObjectController::class, 'getRecordColumns']);

// Game functions
Route::middleware('auth:sanctum')->prefix('game')->group(function () {
    // Standart actions
    Route::get('/get_dashboard', [GameController::class, 'getDashboard']);
    Route::get('/join_universe/{universe}', [GameController::class, 'joinUniverse']);
    Route::get('/get_systems', [GameController::class, 'getSystems']);
    Route::post('/update_camera', [GameController::class, 'updateCamera']);

    // Civilization
    Route::post('/create_civilization', [GameController::class, 'createCivilization']);

    // Admin actions
    Route::middleware('isadmin')->get('/generate_system/{universe}', [GameController::class, 'generateSystem']);
    Route::middleware('isadmin')->get('/generate_systems/{universe}', [GameController::class, 'generateSystems']);
});
