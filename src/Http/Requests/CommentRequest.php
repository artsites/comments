<?php

namespace ArtSites\Comments\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function validationData(): array
    {
        return $this->all();
    }

    protected function failedValidation(Validator $validator)
    {
        throw new \Exception($validator->getMessageBag());
    }

    public function rules()
    {
        return [
            'model_type' => 'required|string',
            'model_id' => 'required|numeric',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'text' => 'required|string|max:65532',
            'g_recaptcha_token' => 'required|string',
        ];
    }
}
