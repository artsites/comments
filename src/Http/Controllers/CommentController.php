<?php

namespace ArtSites\Comments\Http\Controllers;

use App\Helpers\Facades\Locale;
use ArtSites\Comments\Http\Requests\CommentRequest;
use ArtSites\Comments\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController
{
    private int $showMoreCount;
    private bool $hasMultiDb;

    public function __construct()
    {
        $this->showMoreCount = config('comments.show_more_count') ?? 8;
        $this->hasMultiDb = config('comments.has_multi_db') !== null ? config('comments.has_multi_db') : false;
    }

    public function create(CommentRequest $request): JsonResponse
    {
        if($this->hasMultiDb) {
            Locale::set($request->lang);
        }

        if( ! ($request->token && $request->url)) return response()->json();

        $comment = Comment::query()->create([
            'token' => $request->token,
            'model_type' => $request->model_type,
            'model_id' => $request->model_id,
            'url' => $request->url,
            'name' => $request->name,
            'email' => $request->email,
            'text' => $request->text,
        ]);

        $commentView = View('comments::partials.item', [
            'comment' => $comment,
        ])->render();

        return response()->json([
            'commentView' => $commentView,
        ]);
    }

    public function delete(Request $request): JsonResponse
    {
        if($this->hasMultiDb) {
            Locale::set($request->lang);
        }

        $userCookie = isset($_COOKIE['comment-user']) ? json_decode($_COOKIE['comment-user']) : null;
        if($request->id && $request->token && $userCookie?->token == $request->token) {
            $comment = Comment::query()
                ->where('id', $request->id)
                ->where('token', $request->token)
                ->first();
            $comment?->delete();
        }
        return response()->json();
    }

    public function showMore(Request $request): JsonResponse
    {
        if($this->hasMultiDb) {
            Locale::set($request->lang);
        }

        $comments = Comment::query()
            ->orderByDesc('id')
            ->where('model_type', $request->model_type)
            ->where('model_id', $request->model_id)
            ->skip($request->offset)
            ->take($this->showMoreCount)
            ->get();

        $commentsView = View('comments::partials.items-loop', [
            'comments' => $comments,
        ])->render();

        $hasMore = false;
        if($comments->isNotEmpty()) {
            $hasMore = Comment::query()
                ->where('model_type', $request->model_type)
                ->where('model_id', $request->model_id)
                ->skip($request->offset + $comments->count())
                ->take(PHP_INT_MAX)
                ->exists();
        }

        return response()->json([
            'commentsView' => $commentsView,
            'hasMore' => $hasMore,
        ]);
    }

    public function hasMore(Request $request): JsonResponse
    {
        if($this->hasMultiDb) {
            Locale::set($request->lang);
        }

        $hasMore = false;
        $showMoreButtonView = null;
        if($request->offset > 0) {
            $hasMore = Comment::query()
                ->where('model_type', $request->model_type)
                ->where('model_id', $request->model_id)
                ->skip($request->offset)
                ->take(PHP_INT_MAX)
                ->exists();

            if($hasMore) {
                $showMoreButtonView = View('comments::partials.show-more')->render();
            }
        }

        return response()->json([
            'hasMore' => $hasMore,
            'showMoreButtonView' => $showMoreButtonView,
        ]);
    }
}
