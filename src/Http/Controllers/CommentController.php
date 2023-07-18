<?php

namespace ArtSites\Comments\Http\Controllers;

use ArtSites\Comments\CommentService;
use ArtSites\Comments\Http\Requests\CommentRequest;
use ArtSites\Comments\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CommentController
{
    public function create(CommentRequest $request, CommentService $commentService): JsonResponse
    {
        $captchaResponse = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret'   => env('RECAPTCHA_SECRET_KEY'),
            'response' => $request->g_recaptcha_token,
        ])->json();

        if( ! $captchaResponse['success']) return response()->json();

        if( ! ($request->user_token && $request->url)) return response()->json();

        $text = $commentService->validateText($request->text);
        if(blank($text)) return response()->json();

        $comment = Comment::query()->create([
            'user_token' => $request->user_token,
            'model_type' => $request->model_type,
            'model_id' => $request->model_id,
            'url' => $request->url,
            'name' => $request->name,
            'email' => $request->email,
            'text' => $text,
        ]);

        $commentView = view('comments::partials.item', [
            'comment' => $comment,
        ])->render();

        return response()->json([
            'commentView' => $commentView,
        ]);
    }

    public function delete(Request $request): JsonResponse
    {
        $userCookie = isset($_COOKIE['comment-user']) ? json_decode($_COOKIE['comment-user']) : null;
        if($request->id && $request->user_token && $userCookie?->token == $request->user_token) {
            $comment = Comment::query()
                ->where('id', $request->id)
                ->where('user_token', $request->user_token)
                ->first();
            $comment?->delete();
        }
        return response()->json();
    }

    public function showMore(Request $request): JsonResponse
    {
        $comments = Comment::query()
            ->orderByDesc('id')
            ->where('model_type', $request->model_type)
            ->where('model_id', $request->model_id)
            ->skip($request->offset)
            ->take(config('comments.show_more_count', 8))
            ->get();

        foreach ($comments as $comment) {
            $commentsViews[] = view('comments::partials.item', [
                'comment' => $comment,
            ])->render();
        }

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
            'commentsViews' => $commentsViews,
            'hasMore' => $hasMore,
        ]);
    }

    public function hasMore(Request $request): JsonResponse
    {
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
                $showMoreButtonView = view('comments::partials.show-more')->render();
            }
        }

        return response()->json([
            'hasMore' => $hasMore,
            'showMoreButtonView' => $showMoreButtonView,
        ]);
    }
}
