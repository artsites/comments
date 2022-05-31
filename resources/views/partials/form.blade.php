<div class="mb-5">
    <form id="comment-form"
          data-recaptcha_key="{{ env('RECAPTCHA_SITE_KEY') }}"
          class="w-full p-4"
          data-model_type="{{ get_class($model) }}"
          data-model_id="{{ $model->id }}">
        @csrf
        <div class="mb-2">
            <div class="mb-3">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ваше имя</label>
                <input type="text" id="name" name="name" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div class="mb-3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ваш email</label>
                <input type="email" id="email" name="email" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div class="mb-3">
                <label for="comment" class="text-lg text-gray-600">Add a comment</label>
                <textarea name="text" class="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1" required></textarea>
            </div>
        </div>

        <button type="submit" id="submit-btn" class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">Comment</button>
    </form>
</div>
