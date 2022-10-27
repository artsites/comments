<?php

namespace ArtSites\Comments\Observers;

use ArtSites\Comments\Models\Comment;
use Illuminate\Support\Str;

class CommentObserver
{
    public function creating(Comment $comment)
    {
        $comment->uuid = Str::uuid();
        $comment->model->touch();
    }

    public function deleted(Comment $comment): void
    {
        $comment->model->touch();
    }
}
