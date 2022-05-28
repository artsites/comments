<?php

namespace ArtSites\Comments\Models\Traits;

use ArtSites\Comments\Models\Comment;

trait HasComments
{
    public function comments(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Comment::class, 'model')->orderByDesc('id');
    }
}
