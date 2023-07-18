<?php

namespace ArtSites\Comments\Models\Traits;

use ArtSites\Comments\Models\Comment;
use Illuminate\Support\Collection;

trait HasComments
{
    public function comments(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Comment::class, 'model')->orderByDesc('id');
    }

    public function getComments(int|null $count = null): Collection
    {
        $count = $count ?? config('comments.show_more_count', 8);

        return $this->comments()->take($count)->get();
    }
}
