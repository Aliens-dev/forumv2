<?php

use Illuminate\Http\Request;
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
Route::resource('posts.replies','Post\PostRepliesController')->only(['index']);
Route::resource('replies','Reply\ReplyController')->except(['create','edit']);