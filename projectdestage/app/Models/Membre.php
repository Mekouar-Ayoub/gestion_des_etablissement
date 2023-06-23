<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membre extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'prenom',
        'tel',
        'email',
        'password',
        'adresse',
        'solde',
        'famille_id',
        'etudient',
        'type'
    ];
    public function famille()
    {
        return $this->belongsTo(Famille::class);
    }
}
