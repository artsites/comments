<div>
    <form class="comment-form"
          data-recaptcha_key="{{ env('RECAPTCHA_SITE_KEY') }}"
          data-model_type="{{ strtolower(get_class($model)) }}"
          data-model_id="{{ $model->id }}">
        <div>
            <div>
                <label>
                    Ваше имя
                    <input type="text" name="name" required/>
                </label>
            </div>
            <div>
                <label>
                    Ваш email
                    <input type="email" name="email" required/>
                </label>
            </div>
            <div>
                <label>
                    Add a comment
                    <textarea name="text" required></textarea>
                </label>
            </div>
        </div>

        <button type="submit" class="submit-btn" style="cursor: pointer">Comment</button>
    </form>
</div>
