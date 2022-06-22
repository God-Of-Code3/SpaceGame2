<?php

namespace App\Http\Controllers;

use App\Models\Civilization;
use App\Models\SpaceObject;
use App\Models\SpaceObjectType;
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

            $this->getUniversesUI($ui);

            $resp = ApiController::getResp();
            $resp->setContent($ui->getUI());
            $resp->echo();
        } else {
            $civilization = Civilization::where('user_universe_member_id', '=', $userUniverseMember->id)->first();
            if ($civilization) {
                $this->getSystemsUI($ui, $userUniverseMember);
            } else {
                $this->getCreatingCivilizationUI($ui, $userUniverseMember);
            }


            $resp = ApiController::getResp();
            $resp->setContent($ui->getUI());
            $resp->echo();
        }
    }

    public function getSystemsUI($ui, $userUniverseMember)
    {
        $systems = [];
        foreach (SpaceObjectController::getSystems($userUniverseMember->universe_id) as $system) {
            $systems[] = $ui->block3(
                $system['name'],
                []
            );
        }

        $ui->setTitle("Системы текущей вселенной");
        $row = $ui->row($systems);
        $ui->addChild($row);
    }

    public function getCreatingCivilizationUI($ui, $userUniverseMember)
    {
        $fields = [
            [
                'name' => 'name',
                'label' => 'Название цивилизации',
                'type' => 'text',
                'value' => '',
            ]
        ];

        $ui->setTitle('Создание цивилизации');
        $form = $ui->form("/api/game/create_civilization/", $fields, "Создать");
        $block = $ui->block('Настройки цивилизации', [], [$form]);
        $ui->addChild($block);
    }

    public function createCivilization(Request $req)
    {
        $userUniverseMember = $this->getUserUniverseMember($req);
        $universe = Universe::find($userUniverseMember->universe_id);

        $name = $req->input('name');
        $issetName = Civilization::whereRaw("starting_planet_id IN (SELECT id FROM space_objects WHERE universe_id = '$universe->id')")->where('name', '=', $name)->first();
        // dd($names);

        if (!$issetName and $name) {
            CivilizationController::createCivilization($universe, $userUniverseMember, $name);

            $resp = ApiController::getResp();
            $resp->echo();
        } else {

            $resp = ApiController::getResp();
            $resp->fail();
            if ($issetName) {
                $resp->addFormAlert('error', 'Имя уже занято');
            } else {
                $resp->addFormAlert('error', 'Введите имя');
            }
            $resp->echo();
        }
    }

    public function getUniversesUI($ui)
    {
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
    }

    public function joinUniverse(Request $req, Universe $universe)
    {
        $userUniverseMember = $this->getUserUniverseMember($req);

        if ($userUniverseMember) {
            $resp = ApiController::getResp();
            $resp->fail();
            $resp->echo();
        } else {
            $userUniverseMember = UserUniverseMember::create([
                'user_id' => $req->user()->id,
                'universe_id' => $universe->id,
                'x' => 0,
                'y' => 0,
                'scale' => 1
            ]);



            $resp = ApiController::getResp();
            // $resp->setContent(['objects' => $freeObjects]);
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

        $types = [];
        foreach (SpaceObjectType::get() as $type) {
            $types[$type->id] = $type->name;
        }

        $resp->setContent([
            'objects' => $objects,
            'types' => $types
        ]);
        $resp->echo();
    }

    public function generateSystem(Request $req, Universe $universe)
    {
        SystemController::generateSystem($universe);
        $resp = ApiController::getResp();
        $resp->echo();
    }

    static public function generateSystems(Universe $universe)
    {
        for ($i = 0; $i < 10; $i++) {
            SystemController::generateSystem($universe);
        }
        $resp = ApiController::getResp();
        $resp->echo();
    }
}
