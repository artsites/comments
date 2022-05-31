<?php

/** Config for github.com/artsites/comments */

return [
    //comments count when click show more button
    'show_more_count' => 8,

    //for projects which has translated databases with lang path
    'has_multi_db_lang_path' => false,
    'locale_class' => \App\Helpers\Facades\Locale::class,
    'set_method' => 'set',
    //********************************************************//
];
