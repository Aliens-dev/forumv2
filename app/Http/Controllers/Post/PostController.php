<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post;


class PostController extends Controller
{
    public function index() {

    }
    public function show(Post $post) {
        return response()->json(['success'=>true,'data'=>$post],200);
    }
    public function store() {

    }
    public function update() {

    }
    public function destroy() {

    }
}
