<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Membre extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;



    public function getJWTIdentifier()
    {
        return $this->getKey();
    }



    public function getJWTCustomClaims()
    {
        return [];
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    public $table = 'membres';
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

    public function coure()
    {
        return $this->belongsToMany(Coure::class, 'elev_coures');
    }


    //TODO Working ?
    public function history()
    {
        return $this->hasMany(CompteEleve::class);
    }

    //Working ?
    public function historyEcole()
    {
        return $this->hasMany(CompteEcole::class);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}











