<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post;
use App\Forum;
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

    public function update() {

    }
    public function destroy() {

    }
}
