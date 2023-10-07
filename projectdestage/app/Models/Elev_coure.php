<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Elev_coure extends Model
{
    use HasFactory;
    public $table = 'elev_coures';
    protected $fillable = [
        'membre_id',
        'coure_id'
    ];


    //Not working
    public function coure()
    {
        return $this->hasOne(Coure::class);
    }

    public function membres() {
        return $this->belongsTo(Member::class, 'membre_id');
    }


}
