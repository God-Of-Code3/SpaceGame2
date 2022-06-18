<?php

namespace App\Http\Controllers;

use App\Models\SpaceObject;
use App\Models\Universe;
use App\Models\UserUniverseMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GameController extends Controller
{

    protected function getUserUniverseMember(Request $req)
    {
        $userUniverseMember = UserUniverseMember::where('user_id', '=', $req->user()->id)->first();

        return $userUniverseMember;
    }

    public function getDashboard(Request $req)
    {
        // Finding if user is a member of a universe
        $userUniverseMember = $this->getUserUniverseMember($req);
        $ui = UIController::getUI();
        $ui->setTitle("Рабочая панель");

        if (!$userUniverseMember) { // If member isset

            $universes = [];

            foreach (Universe::get() as $universe) {
                $universes[] = $ui->block3(
                    $universe->name,
                    [
                        $ui->btn('primary', 'Присоединиться', "/api/game/join_universe/$universe->id")
                    ]
                );
            }

            $ui->setTitle("Присоединитесь ко вселенной");
            $row = $ui->row($universes);
            $ui->addChild($row);

            $resp = ApiController::getResp();
            $resp->setContent($ui->getUI());
            $resp->echo();
        } else {
            $resp = ApiController::getResp();
            // $systems = [];
            // foreach($this->getSystems($req) as $system) {
            //     $systems = $ui->block3();
            // }
            $resp->setContent($this->getSystems($req));
            // $resp->setContent($ui->getUI());
            $resp->echo();
        }
    }

    public function joinUniverse(Request $req, Universe $universe)
    {
        $userUniverseMember = $this->getUserUniverseMember($req);

        if ($userUniverseMember) {
            $resp = ApiController::getResp();
            $resp->fail();
            $resp->echo();
        } else {
            UserUniverseMember::create([
                'user_id' => $req->user()->id,
                'universe_id' => $universe->id,
                'x' => 0,
                'y' => 0,
                'scale' => 1
            ]);

            $resp = ApiController::getResp();
            $resp->echo();
        }
    }

    public function getSystems(Request $req)
    {
        $userUniverseMember = $this->getUserUniverseMember($req);
        $resp = ApiController::getResp();

        $objects = [];
        if ($userUniverseMember) {
            $objects = SpaceObjectController::getSystems($userUniverseMember->universe_id);
        }

        $resp->setContent($objects);
        $resp->echo();
    }
}
