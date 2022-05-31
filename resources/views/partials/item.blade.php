<div id="comment-body" class="w-full flex flex-col text-center md:text-left md:flex-row bg-white border-t-2 p-2">
    <div class="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" class="rounded-full shadow h-32 w-32">
    </div>
    <div class="flex-1 flex flex-col justify-center md:justify-start">
        <div class="flex justify-between">
            <p class="font-semibold text-2xl">{{ $comment->name }}</p>
            @php
                $userCookie = isset($_COOKIE['comment-user']) ? json_decode($_COOKIE['comment-user']) : [];
            @endphp
            @if(!empty($userCookie) && $comment->user_token == $userCookie->token)
                <form id="delete-comment" data-id="{{ $comment->id }}">
                    @method('DELETE')
                    @csrf
                    <button type="submit" id="delete-btn" class="fas fa-times"></button>
                </form>
            @endif
        </div>
        <p class="pt-2">{{ $comment->text }}</p>
        <div class="flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4">
        </div>
        <p class="text-sm pb-8 ">
            {{ $comment->created_at->format('d.m.Y H:i') }}
        </p>
    </div>
</div>
