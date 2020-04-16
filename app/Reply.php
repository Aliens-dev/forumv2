<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DateTimeInterface;
class Reply extends Model
{
    protected $hidden = [
        'updated_at',
    ];
    protected $fillable = [
        'content',
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }
    public function post(){
        return $this->belongsTo('App\Post');
    }
    public function forum() {
        return $this->belongsTo('App\Forum');
    }
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('l m Y');
    }
}
