<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompteEcole extends Model
{

    use HasFactory;
    public $table = 'compte_ecole';
    protected $fillable = [
        'solde',
        'cour_id',
        'mouvement'
    ];

    public function cour()
    {
        return $this->belongsTo(Coure::class);
    }

    public function prof()
    {
        return $this->belongsTo(Profe::class);
    }

    public function eleve()
    {
        return $this->belongsTo(Membre::class);
    }
}
