<div class="comment-body">
    <div>
        <div>
            <p class="comment-name">{{ $comment->name }}</p>
            @php
                $userCookie = isset($_COOKIE['comment-user']) ? json_decode($_COOKIE['comment-user']) : [];
            @endphp
            @if(!empty($userCookie) && $comment->user_token == $userCookie->token)
                <form class="delete-comment-form" data-id="{{ $comment->id }}">
                    @method('DELETE')
                    <button type="submit" class="delete-btn" style="cursor: pointer">Удалить</button>
                </form>
            @endif
        </div>
        <p>{{ $comment->text }}</p>
        <div>
            <p>
                {{ $comment->created_at->format('d.m.Y H:i') }}
            </p>
            <p class="reply-btn" style="cursor: pointer">Ответить</p>
        </div>
    </div>
</div>
