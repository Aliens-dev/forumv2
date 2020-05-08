<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    


    public function likeable() {
        $this->morphTo();
    }
    public function user() {
        $this->belongsTo('App\User');
    }
}
