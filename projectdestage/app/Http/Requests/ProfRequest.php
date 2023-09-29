<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nom'=>'required',
            'prenom'=>'required',
            'tel'=>'required',
            'email'=>'required | email',
            'password'=>'required',
            'adress'=>'required',
            'instrument'=>'required',
            'tarif'=>'required',
            'solde'=>'required'
        ];
    }
}
