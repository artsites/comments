<?php

namespace ArtSites\Comments;

class CommentService
{
    public function validateText(string $text): string
    {
        $text = preg_replace('~(\s|\x{3164})+~u', ' ', preg_replace('~^[\s﻿]+|[\s﻿]+$~u', '', $text));

        $text = preg_replace('/.'.addcslashes(env('APP_URL'), '/\+*?[^]$(){}=!<>|:-#').'/', ' *<>/!@#$myDomain*<>/!@#$', $text);
        $text = preg_replace('/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)/', '', $text);

        return str_replace('*<>/!@#$myDomain*<>/!@#$', env('APP_URL'), $text);
    }
}
