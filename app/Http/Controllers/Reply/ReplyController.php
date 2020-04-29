<?php

namespace App\Http\Controllers\Reply;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Reply;
use Illuminate\Support\Facades\Auth;
use App\Forum;
use App\Post;
use Illuminate\Support\Facades\Broadcast;

class ReplyController extends Controller
{


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Reply $reply)
    {
        //return Reply::findOrFail($id);
        return response()->json(['success'=>true,'data'=>$reply],200);
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
        $rules = [
            'content' => 'min:3',
        ];
        $updated = Reply::find($id)->update($request->all());
        return response()->json(['success'=>$updated,'message'=>'Successfully updated!']);
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
        return response()->json(['success'=>true,'message'=>'Successfully deleted!']);
    }
}
