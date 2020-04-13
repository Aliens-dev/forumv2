<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post;
use App\Forum;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{


    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request,$id)
    {
        $rules= [
            'title'=> 'required|max:60|min:3',
            'content'=> 'required|min:10',
            'description' => 'min:10|max:100',
        ];
        $validate = Validator::make($request->all(),$rules);
        if($validate->fails()){
            return response()->json(['success'=>false,'data'=>$validate->errors()]);
        }
        $forum = Forum::findOrFail($id);
        $post = new Post($request->all());
        $saved = $post->forum()->associate($forum)->user()->associate(1)->save();       
        return response()->json(['success'=>$saved]);
    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function show($id)
    {   
        $post = Post::findOrFail($id);
        return response()->json(['success'=>true,'data'=>$post]);
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, $forumId,$postId)
    {
        $rules= [
            'title'=> 'required|max:60|min:3',
            'content'=> 'required|min:10',
            'description' => 'min:10|max:100',
        ];
        $validate = Validator::make($request->all(),$rules);
        if($validate->fails()){
            return response()->json(['success'=>false,'data'=>$validate->errors()]);
        }
        $forum = Forum::findOrFail($forumId);
        $updated = $post = Post::findOrFail($postId)->update($request->all());
        return response()->json(['success'=>$updated]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($forumId,$postId)
    {
        $forum = Forum::findOrFail($forumId);
        $post = $forum->posts()->findOrFail($postId);
        $deleted = $post->delete();
        return response()->json(['success'=>$deleted]);
    }
}
