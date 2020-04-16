<?php

namespace App;
use Carbon;
use Illuminate\Database\Eloquent\Model;
use DateTimeInterface;
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
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('l m Y');
    }
}
