<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MembreRequest extends FormRequest
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
            '*.nom' => 'required|string',
            '*.prenom' => 'required|string',
            '*.tel' => 'required|string',
            '*.email' => 'required|email',
            '*.adresse' => 'required|string',
            '*.solde' => 'required|numeric',
            '*.famille_id' => 'required|integer',
            '*.etudient' => 'required|boolean',
            '*.type' => 'required|string',
        ];
    }
}
