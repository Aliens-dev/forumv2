<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use DateTimeInterface;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','verified','updated_at'
    ];

    public function posts() {
        return $this->hasMany('App\Post');
    }
    public function replies() {
        return $this->hasMany('App\Reply');
    }
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d-m-Y');
    }

}
