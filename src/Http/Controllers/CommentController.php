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
    private int $showMoreCount;
    private bool $hasMultiDbLangPath;

    public function __construct()
    {
        $this->showMoreCount = config('comments.show_more_count') ?? 8;
        $this->hasMultiDbLangPath = config('comments.has_multi_db_lang_path') !== null ? config('comments.has_multi_db_lang_path') : false;
    }

    private function setLocale(string $lang): void
    {
        $localeClass = config('comments.locale_class');
        $setMethod = config('comments.set_method');
        if(! $localeClass || ! $setMethod) throw new \Exception('Please see https://github.com/artsites/comments#readme');
        $localeClass::$setMethod($lang);
    }

    public function create(CommentRequest $request, CommentService $commentService): JsonResponse
    {
        if($this->hasMultiDbLangPath) {
            $this->setLocale($request->lang);
        }

        $captchaResponse = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret'   => env('RECAPTCHA_SECRET_KEY'),
            'response' => $request->g_recaptcha_token,
        ])->json();

        if( ! $captchaResponse['success']) throw new \Exception('Captcha error! '.json_encode($captchaResponse));

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

        $commentView = View('comments::partials.item', [
            'comment' => $comment,
        ])->render();

        return response()->json([
            'commentView' => $commentView,
        ]);
    }

    public function delete(Request $request): JsonResponse
    {
        if($this->hasMultiDbLangPath) {
            $this->setLocale($request->lang);
        }

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
        if($this->hasMultiDbLangPath) {
            $this->setLocale($request->lang);
        }

        $comments = Comment::query()
            ->orderByDesc('id')
            ->where('model_type', $request->model_type)
            ->where('model_id', $request->model_id)
            ->skip($request->offset)
            ->take($this->showMoreCount)
            ->get();

        foreach ($comments as $comment) {
            $commentsViews[] = View('comments::partials.item', [
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
        if($this->hasMultiDbLangPath) {
            $this->setLocale($request->lang);
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
