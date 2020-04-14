<?php

namespace App\Http\Controllers\Post;

use App\Forum;
use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Http\Request;
use App\Reply;
class PostRepliesController extends Controller
{
    public function index(Forum $forum,Post $post) {
        if(!$forum->posts->contains($post->id)){
            return response()->json(['success'=>false,'data'=>'Page not Found'],404);
        }
        $replies = $post->replies()->with('user')->get();
        return response()->json(['success'=>true,'data'=>$replies],200);
    }
     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,Forum $forum,Post $post)
    {
        if(!$forum->posts->contains($post->id)){
            return response()->json(['success'=>false,'data'=>'Page not Found'],404);
        }
        $rules = [
            'content' => 'min:3',
        ];
        $reply = new Reply($request->all());
        $saved = $reply->forum()->associate($forum)->user()->associate(1)->post()->associate($post)->save();
        return response()->json(['success'=>$saved],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Reply::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id,Forum $forum,Post $post)
    {
        if(!$forum->posts->contains($post->id)){
            return response()->json(['success'=>false,'data'=>'Page not Found'],404);
        }
        $rules = [
            'content' => 'min:3',
        ];
        $updated = Reply::find($id)->update($request->all());
        return response()->json(['success'=>$updated]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reply = Reply::findOrFail($id);
        $reply->delete();
        return response()->json(['success'=>true]);
    }
}
