<?php

use Illuminate\Support\Facades\Route;

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

Route::resource('forums','Forum\ForumController')->except(['create','edit']);
Route::resource('forums.posts','Forum\ForumPostsController')->only(['index']);
Route::resource('posts','Post\PostController')->except(['index','edit','create']);
Route::resource('posts.replies','Post\PostRepliesController')->only(['index','store']);
Route::resource('replies','Reply\ReplyController')->except(['index,create','edit']);
Route::resource('users','User\UserController')->except(['edit','create']);

Route::post('/login','PagesController@login');

Route::group(['middleware'=>'auth.jwt'], function () {
    Route::post('/refresh','PagesController@refresh');
    Route::post('/logout','PagesController@logout');
});
