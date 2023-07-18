<?php

namespace ArtSites\Comments;

use ArtSites\Comments\Nova\Comment as CommentResource;
use ArtSites\Comments\Models\Comment;
use ArtSites\Comments\Observers\CommentObserver;
use Laravel\Nova\Nova;

class ServiceProvider extends \Illuminate\Support\ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        Nova::resources([CommentResource::class]);
        Comment::observe(CommentObserver::class);

        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'comments');
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');

        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('/views/vendor/comments'),
        ], 'views');

        $this->publishes([
            __DIR__.'/../public/assets/js/' => public_path('/vendor/comments/js/'),
        ], 'js');

        $this->publishes([
            __DIR__.'/../config' => config_path()
        ], 'config');

        $this->publishes([
            __DIR__.'/Nova/Comment.php' => app_path('/Nova/Comment.php'),
        ], 'nova-resource');
    }
}
