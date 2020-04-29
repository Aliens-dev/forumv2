<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserReplied implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $reply;
    public $user;
    public $post;
    public function __construct($post,$reply,$user)
    {
        $this->post = $post;
        $this->reply = $reply;
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('replies.'.$this->post->user_id);
    }
    public function broadcastWith()
    {
        return [
            'post_id' => $this->post->id,
            'post_title' => $this->post->title,
            'forum_id' => $this->post->forum_id,        
            'user' => $this->user->name,
            'isSeen' => false,
        ];
    }
}
