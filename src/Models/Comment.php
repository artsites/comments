<?php

namespace ArtSites\Comments\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comments';
    protected $guarded = ['id'];

    public function model(): MorphTo
    {
        return $this->morphTo();
    }
}
