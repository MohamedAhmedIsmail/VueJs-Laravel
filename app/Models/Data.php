<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Data extends Model
{
    use HasFactory;

    protected $fillable = ['key','value'];

    protected $table = 'data';

    public static function create($data)
    {
        DB::table('data')->truncate();
        foreach($data as $key=>$value)
        {
            $saveData = new self();
            $saveData->key = $key;
            $saveData->value = $value;
            $saveData->save();
        }
    }
}
