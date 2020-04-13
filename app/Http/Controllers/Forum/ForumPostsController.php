<?php

namespace App\Http\Controllers\Forum;

use App\Forum;
use App\Http\Controllers\Controller;


class ForumPostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $posts = Forum::findOrFail($id)
                            ->posts()
                            ->select('id','title','description','user_id','forum_id')
                            ->with('user:name,id')
                            ->withCount('replies')
                            ->get();
        foreach($posts as $post) {
            $post->latest_reply = $post->replies()
                            ->select('content','post_id','user_id')
                            ->with('user:name,id')
                            ->orderByDesc('created_at')
                            ->first();
        }
        return response()->json(['data'=>$posts],200);
    }
}
