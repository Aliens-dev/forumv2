<?php

namespace App\Http\Controllers\Post;

use App\Events\UserReplied;
use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Http\Request;
use App\Reply;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class PostRepliesController extends Controller
{
    public function index($id) {
        $replies = Post::findOrFail($id)->replies()->get();

        foreach($replies as $reply) {
            $reply->likes = Reply::find($reply->id)->likes()->get()->pluck('user_id');
        }


        return response()->json(['success'=>true,'data'=>$replies],200);
    }
        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,Post $post)
    {
        $rules = [
            'content' => 'min:3',
        ];
        $reply = new Reply($request->all());
        $reply->forum()
                ->associate($post->forum_id)
                ->user()
                ->associate(JWTAuth::user())
                ->post()
                ->associate($post)
                ->save();
        $reply = Reply::find($reply->id);
        broadcast(new UserReplied($post,$reply,JWTAuth::user()));
        return response()->json(['success'=>true,'data'=>$reply],201);
    }
}
