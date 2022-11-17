<?php

use Illuminate\Support\Facades\Route;

/***************************** AUTH **************************************/
Route::middleware('web')->post('login', 'App\Http\Controllers\Apis\AuthController@login')->name('login');
Route::middleware('auth:sanctum')->get("/refresh", 'App\Http\Controllers\Apis\AuthController@refresh');
Route::post('logout', 'App\Http\Controllers\Apis\AuthController@logout');
/*************************************************************************/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/categories','App\Http\Controllers\Apis\CategoryController@index');
    Route::get('/properties/{sub_id}','App\Http\Controllers\Apis\PropertyController@index');
    Route::get('/options-child/{property_id}/{option_id}','App\Http\Controllers\Apis\OptionsController@index');

    Route::post('/postData','App\Http\Controllers\Apis\DataHandlerController@index');

    Route::get('/getData','App\Http\Controllers\Apis\DataHandlerController@getData');
});


