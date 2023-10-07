<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryEleve extends Model
{
    use HasFactory;

    public $table='historique_soldes_eleve';

    public $fillable = [
        'nombre_heures',
        'cour_id',
        'eleve_id',
        'prix',
        'type'
    ];


    // NOt working
    public function eleve()
    {
        return $this->hasOne(Membre::class,'id');
    }

    //TODO Important
    public function cour()
    {
        return $this->hasOne(Coure::class,'id');
    }
}
