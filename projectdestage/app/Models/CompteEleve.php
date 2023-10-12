<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompteEleve extends Model
{
    use HasFactory;

    public $table='compte_eleve';

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

    //TODO Not working
    public function cour()
    {
        return $this->hasOne(Coure::class,'id');
    }
}
