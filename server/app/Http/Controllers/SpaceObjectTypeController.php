<?php

namespace App\Http\Controllers;

use App\Models\SpaceObjectType;
use Illuminate\Http\Request;

class SpaceObjectTypeController extends Controller
{
    public function get()
    {
        $spaceObjectTypes = SpaceObjectType::get();

        $resp = ApiController::getResp();
        $resp->setContent($spaceObjectTypes);
        $resp->echo();
    }

    public function create(Request $req)
    {
        SpaceObjectType::create($req->all());

        $resp = ApiController::getResp();
        $resp->echo();
    }

    public function getOne(Request $req, $universe)
    {
    }
}
