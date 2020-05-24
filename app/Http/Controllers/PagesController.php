<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class PagesController extends Controller
{


    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = JWTAuth::attempt($credentials)) {
            return $this->respondWithToken($token);
        }

        return response()->json(['success' => false]);
    }

    public function register(Request $request) {
        $rules = [
            'name' => 'required|min:3|max:20',
            'email' => 'required|email|unique:users',
            'password' => 'required_with:password_confirmation|same:password_confirmation|min:3|max:20',
            'password_confirmation' => "required",
        ];
        $validate = Validator::make($request->all(),$rules);
        if($validate->fails()){
            return response()->json(['success'=>false,'errors'=>$validate->errors()]);
        }
        $user = new User();
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->name = $request->name;
        $user->save();
        return response()->json(['success'=>true,'message'=>'Successfully created']);
    }


    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        JWTAuth::logout();
        return response()->json(['success'=>true]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return response()->json(['success'=>true]);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'success'=> true,
            'access_token' => $token,
            'expires_in' => 60,
            'user' => JWTAuth::user(),
        ]);
    }

}
