<?php

namespace App\Http\Controllers\Reply;

use App\Http\Controllers\Controller;
use App\Like;
use App\Reply;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ReplyLikesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store(Request $request,Reply $reply)
    {
        $user = JWTAuth::user();
        if($reply->likes->where('user_id',$user->id)->count()) {
            $like = Like::where('user_id',$user->id);
            $like->delete();
            return response()->json(['success'=>true,'data'=>0]);
        }else {
            $like = new Like();
            $like->user_id = $user->id;
            $reply->likes()->save($like);
            return response()->json(['success'=>true,'data'=>1]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
