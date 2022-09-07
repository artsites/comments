<?php

namespace ArtSites\Comments\Nova;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;

class Comment extends \App\Nova\Resource
{
    public static string $model = \ArtSites\Comments\Models\Comment::class;

    public static $perPageViaRelationship = 25;

    public static $title = 'name';

    public static $search = [
        'name', 'text'
    ];

    public function fields(Request $request)
    {
        return [
            Text::make('Имя', 'name')
                ->displayUsing(fn($link) => Str::limit($link, 25, '...'))
                ->onlyOnIndex(),
            Text::make('Имя', 'name')->hideFromIndex()->readonly(),

            Text::make('Email', 'email')->hideFromIndex()->readonly(),

            Text::make('Текст', 'text')
                ->displayUsing(fn($link) => Str::limit($link, 65, '...'))
                ->onlyOnIndex(),
            Textarea::make('Текст', 'text')->hideFromIndex()->readonly(),

            DateTime::make('Дата', 'created_at')
                ->readonly(),
        ];
    }

    public static function label(): string
    {
        return 'Комментарии';
    }

    public static function singularLabel(): string
    {
        return 'Комментарий';
    }

    public static function authorizedToCreate(Request $request): bool
    {
        return false;
    }

    public function authorizedToUpdate(Request $request): bool
    {
        return false;
    }
}
