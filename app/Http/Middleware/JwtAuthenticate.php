<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        }catch (\Exception $e){
            if($e instanceof TokenInvalidException) {
                return response()->json(['success'=>false,'message'=>'Invalid Token']);
            }else if ($e instanceof TokenExpiredException) {
                return response()->json(['success'=>false,'message'=>'Token Expired']);
            }else {
                return response()->json(['success'=>false,'message'=>'Token Not Found']);
            }
        }
        return $next($request);
    }
}
