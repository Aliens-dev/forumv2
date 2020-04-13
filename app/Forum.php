<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    protected $hidden = ['updated_at'];

    protected $fillable = [
        'name','type'
    ];
    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function replies(){
        return $this->hasManyThrough('App\Post','App\Reply');
    }
}
