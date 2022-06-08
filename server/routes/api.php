<?php

use App\Http\Controllers\CRUDController;
use App\Http\Controllers\SpaceObjectController;
use App\Http\Controllers\SpaceObjectTypeController;
use App\Http\Controllers\SpaceObjectPropTypeController;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\UniverseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
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

Route::middleware('auth:sanctum')->middleware('isadmin')->resource('universe', UniverseController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('space_object_type', SpaceObjectTypeController::class);
Route::middleware('auth:sanctum')->middleware('isadmin')->resource('space_object_prop_type', SpaceObjectPropTypeController::class);
