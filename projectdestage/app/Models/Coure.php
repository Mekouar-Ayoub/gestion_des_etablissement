<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coure extends Model
{
    use HasFactory;

    public function profe()
    {
        return $this->belongsTo(Profe::class);
    }

    //TODO new can define '' creer coure_membre
    public function membres()
    {
        return $this->belongsToMany(Membre::class, 'elev_coures');
    }


}
