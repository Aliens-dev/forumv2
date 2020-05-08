<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use \DateTimeInterface;
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
    public function likes() {
        return $this->morphMany('App\Like','likeable');
    }
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('l m Y');
    }
}
