<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForumRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if($this->getMethod() === 'POST'){
            return [
                'name'=> 'required|max:30|min:3|unique:forums',
                'type'=> 'in:1,0',
            ];
        }
    }
}
