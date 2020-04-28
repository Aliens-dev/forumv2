<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Http\Request;
use App\Reply;
use Illuminate\Support\Facades\Auth;

class PostRepliesController extends Controller
{
    public function index($id) {
        $replies = Post::findOrFail($id)->replies()->get();
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
                ->associate(Auth::user())
                ->post()
                ->associate($post)
                ->save();
        $reply = Reply::find($reply->id);
        return response()->json(['success'=>true,'data'=>$reply],201);
    }
}
