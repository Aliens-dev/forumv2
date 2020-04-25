<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post;
use App\Forum;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class PostController extends Controller
{

    public function __construct()
    {
        $this->middleware(['jwt.auth'])->except('show');
    }

    public function index() {

    }
    public function show(Post $post) {
        return response()->json(['success'=>true,'data'=>$post],200);
    }
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
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
        $forum = Forum::findOrFail($request->forum_id);
        $post = new Post($request->all());
        $saved = $post->forum()->associate($forum)->user()->associate(JWTAuth::user())->save();
        return response()->json(['success'=>$saved,'data'=>$post]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$postId)
    {
        $post = Post::findOrFail($postId);
        if(Gate::denies('update',$post)) {
            return response()->json(['success'=>false,'message'=>'Not Authorized action'],401);
        }
        $rules= [
            'title'=> 'required|max:60|min:3',
            'content'=> 'required|min:10',
            'description' => 'min:10|max:100',
        ];
        $validate = Validator::make($request->all(),$rules);
        if($validate->fails()){
            return response()->json([
                    'success'=>false,
                    'data'=>$validate->errors(),
                ]);
        }
        $updated = $post->update($request->all());
        return response()->json([
                'success'=>$updated,
                'post' => $post,
                'message' => 'Post updated successfully!',
            ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $postId
     * @return \Illuminate\Http\Response
     */
    public function destroy($postId)
    {
        $post = Post::findOrFail($postId);
        if(Gate::denies('delete',$post)) {
            return response()->json([
                'success'=>false,
                'message' => "Not Authorized action!"
            ],401);
        }
        $deleted = $post->delete();
        return response()->json([
            'success'=>$deleted,
            'message' => $deleted ? 'Successfully deleted!' : 'Error Accured Please try later!',
        ]);
    }
}
