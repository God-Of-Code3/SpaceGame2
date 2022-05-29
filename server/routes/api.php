<?php

use App\Http\Controllers\CRUDController;
use App\Http\Controllers\SpaceObjectController;
use App\Http\Controllers\SpaceObjectTypeController;
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

// Universe
Route::middleware('auth:sanctum')->prefix('universe')->group(function () {
    Route::get('/', [UniverseController::class, 'get'])->middleware('isadmin');
    Route::post('/', [UniverseController::class, 'create'])->middleware('isadmin');
    Route::get('/getInfo', [UniverseController::class, 'getInfo'])->middleware('isadmin');

    Route::get('/{universe}', [UniverseController::class, 'getOne'])->middleware('isadmin');
    Route::post('/{universe}', [UniverseController::class, 'update'])->middleware('isadmin');
    Route::delete('/{universe}', [UniverseController::class, 'delete'])->middleware('isadmin');
});

// Space object type
Route::middleware('auth:sanctum')->middleware('isadmin')->prefix('space-object-type')->group(function () {
    Route::get('/', [SpaceObjectTypeController::class, 'get']);
    Route::post('/', [SpaceObjectTypeController::class, 'create']);
    Route::get('/getInfo', [SpaceObjectTypeController::class, 'getInfo']);

    Route::get('/{spaceObjectType}', [SpaceObjectTypeController::class, 'getOne']);
    Route::post('/{spaceObjectType}', [SpaceObjectTypeController::class, 'update']);
    Route::delete('/{spaceObjectType}', [SpaceObjectTypeController::class, 'delete']);
});

// Space object
foreach (SpaceObjectType::get() as $objectType) {
    Route::middleware('auth:sanctum')->middleware('isadmin')->middleware('spaceobjecttype')->prefix("$objectType->name")->group(function () {
        Route::get('/getInfo', [SpaceObjectController::class, 'getInfo']);
        Route::get('/', [SpaceObjectController::class, 'get']);
    });
}



// CRUD controls
Route::middleware('auth:sanctum')->middleware('isadmin')->prefix('crud-controls')->group(function () {
    Route::get('/get-tabs', [CRUDController::class, 'getTabs']);
});
