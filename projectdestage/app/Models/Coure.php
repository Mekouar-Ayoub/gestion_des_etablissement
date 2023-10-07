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

    //TODO Important
    public function membres()
    {
        return $this->belongsToMany(Membre::class, 'elev_coures');
    }


    public function historyMember()
    {
        return $this->hasMany(HistoryEleve::class, 'cour_id');
    }

    public function historyProf()
    {
        return $this->hasMany(HistoryProf::class, 'cour_id');
    }

    public function historyEcole()
    {
        return $this->hasMany(HistoryEcole::class, 'cour_id');
    }




}
