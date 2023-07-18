<script src="https://www.google.com/recaptcha/api.js?render={{ env('RECAPTCHA_SITE_KEY') }}"></script>

<div class="comments-container">
    <div>
        @include('comments::partials.form')
        <div class="comments-view">
            @include('comments::partials.items-loop')
        </div>
    </div>
</div>

<script src="/vendor/comments/js/app.js" defer></script>
