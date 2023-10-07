<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryProf extends Model
{
    use HasFactory;
    protected $table='historique_soldes_prof';

    protected $fillable = [
        'id',
        'prof_id',
        'coure_id',
        'nombre_heures',
        'prix_a_rendre',
        'profit',
        'type',

    ];
    public function prof()
    {
        return $this->belongsTo(Profe::class,'prof_id');
    }

    //TODO Important
    public function cour()
    {
        return $this->belongsTo(Coure::class,'cour_id');
    }




}
