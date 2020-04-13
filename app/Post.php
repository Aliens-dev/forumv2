<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title','description','content'
    ];

    public function replies(){
        return $this->hasMany('App\Reply');
    }
    public function user() {
        return $this->belongsTo('App\User');
    }
    public function forum () {
        return $this->belongsTo('App\Forum');
    }
}
