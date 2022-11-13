<?php

namespace App\Http\Controllers\Apis;

use App\Classes\DataHandler;
use App\Http\Controllers\Controller;
use App\Models\Data;
use Illuminate\Http\Request;

class DataHandlerController extends Controller
{

    public function index(Request $request)
    {
        $data = $request->all();
//        dd($data);
        $data = DataHandler::handleData($data);
        Data::create($data);
    }

    public function getData()
    {
        $data = Data::get()->toArray();
        return $data;
    }

}
