<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Like;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class PostLikesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($postId)
    {
        $likes = Post::find($postId)->likes()->get();
        foreach($likes as $like) {
            $like->user = User::find($like->user_id);
        }
        $likes= $likes->pluck('user.id');
        return response()->json($likes);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,Post $post)
    {
        $user = JWTAuth::user();
        if($post->likes->where('user_id',$user->id)->count()) {
            $like = Like::where('user_id',$user->id);
            $like->delete();
            return response()->json(['success'=>true,'data'=>0]);
        }else {
            $like = new Like();
            $like->user_id = $user->id;
            $post->likes()->save($like);
            return response()->json(['success'=>true,'data'=>1]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
