<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'description',
        'price',
        'category_id',
    ];

    protected $table = 'foods'; // Assurez-vous que le nom de la table est correct

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}