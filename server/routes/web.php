<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth::routes();

Route::get('/{path?}', function () {
    return view('welcome');
})->where('path', '^((?!api|sanctum).)*$');

// Route::get('/api/users', [App\Http\Controllers\UserController::class, 'create'])->name('create');
// Route::post('/api/user', [App\Http\Controllers\UserController::class, 'create'])->name('create');
// Route::post('/api/auth', [App\Http\Controllers\UserController::class, 'auth'])->name('auth');

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
