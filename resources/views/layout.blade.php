<script src="https://www.google.com/recaptcha/api.js?render={{ env('RECAPTCHA_SITE_KEY') }}"></script>

<div id="comments-container" class="comments-container container">
    <div class="shadow">
        @include('comments::partials.form')
        <div id="comments-view">
            @include('comments::partials.items-loop')
        </div>
    </div>
</div>

<script src="/vendor/comments/comments.js" defer></script>
