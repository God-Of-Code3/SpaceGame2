<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

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
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function setApiTokenAttribute($value)
    {
        $this->attributes['api_token'] = Hash::make($value);
    }

    public function role()
    {
        return Role::find($this->role_id);
    }

    static public function getColumns()
    {
        $roles = [];
        foreach (Role::get() as $role) {
            $roles[] = [
                'value' => $role->id,
                'label' => $role->name
            ];
        }

        return [
            'name' => ['Имя пользователя', 'text'],
            'email' => ['Email', 'email'],
            'password' => ['Пароль', 'password'],
            'role_id' => ['Статус', 'select', $roles],
        ];
    }
}
