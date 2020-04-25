<?php

namespace App\Http\Controllers\Forum;

use App\Forum;
use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ForumPostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $posts = Forum::findOrFail($id)->posts()->with('replies')->withCount('replies')->get();
        return response()->json(['success'=>true,'data'=>$posts],200);
    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function show(Forum $forum, $postId)
    {   
        if(!$forum->posts->contains($postId)){
            return response()->json(['success'=>false,'data'=>'Page not Found'],404);
        }
        $post = Post::where('id',$postId)->first();
        return response()->json(['success'=>true,'data'=>$post]);
    }

}
