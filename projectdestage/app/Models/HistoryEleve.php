<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryEleve extends Model
{
    use HasFactory;

    protected $table='historique_soldes_eleve';

    protected $fillable = [
        'nombre_heures',
        'cour_id',
        'eleve_id',
        'prix',
        'type'
    ];

    public function eleve()
    {
        return $this->belongsTo(Membre::class,'eleve_id');
    }

    //TODO Important
    public function cour()
    {
        return $this->belongsTo(Coure::class,'cour_id');
    }
}
