<?php

namespace ArtSites\Comments\Observers;

use ArtSites\Comments\Models\Comment;

class CommentObserver
{
    public function creating(Comment $comment)
    {
        $comment->model->touch();
    }

    public function deleted(Comment $comment): void
    {
        $comment->model->touch();
    }
}
