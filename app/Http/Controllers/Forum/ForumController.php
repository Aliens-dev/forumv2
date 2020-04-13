<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Forum;
use App\Http\Requests\ForumRequest;
use App\Post;
use Illuminate\Support\Facades\Validator;

class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $forums = Forum::select('id','name')
            ->withCount('posts')->get();
        foreach($forums as $forum) {
            $forum->latest_post = $forum->posts()->select('title','user_id')->with('user:id,name')->orderByDesc('created_at')->first();
        }
        return response()->json(['success'=>true,'data'=>$forums],200);
    }
    public function show(Forum $forum) {
        return $forum;
    }
    public function store(Request $request) {
        $rules = [
            'name'=> 'required|max:30|min:3|unique:forums',
            'type'=> 'in:1,0',
        ];
        $validate = Validator::make($request->all(),$rules);
        if($validate->fails()){
            return response()->json(['data',$validate->errors()],403);
        }
        Forum::create($request->all());
        return response()->json(['success',true],201);
    }
    public function destroy($id) {
        $isDeleted = Forum::findOrFail($id)->delete($id);
        return response()->json(['success'=>$isDeleted]);
    }
}
