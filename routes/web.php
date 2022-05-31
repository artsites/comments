<?php

use ArtSites\Comments\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::prefix('api-comments')->group(function () {
    Route::post('/create', [CommentController::class, 'create'])->name('comment.create');
    Route::delete('/delete/{id}', [CommentController::class, 'delete'])->name('comment.delete');
    Route::get('/show-more', [CommentController::class, 'showMore'])->name('comment.show-more');

    Route::get('/has-more', [CommentController::class, 'hasMore'])->name('comment.has-more');
});
