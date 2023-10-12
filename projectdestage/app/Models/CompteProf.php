<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompteProf extends Model
{
    use HasFactory;
    public $table='compte_prof';

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

    //TODO working ?
    public function cour()
    {
        return $this->belongsTo(Coure::class,'coure_id');
    }




}
