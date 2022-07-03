<?php

namespace App\Http\Controllers;

use App\Models\Civilization;
use App\Models\Colony;
use App\Models\ColonyType;
use App\Models\ProductionCategory;
use App\Models\SpaceObject;
use App\Models\SpaceObjectPropType;
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

        $civilization = Civilization::where('user_universe_member_id', '=', $userUniverseMember->id)->first();
        $colonies = [];
        if ($civilization) {
            $colonies = DB::select(DB::raw("
                SELECT 
                    col.name, 
                    col.colony_type_id,
                    so.x, 
                    so.y, 
                    so.rad ,
                    so.dist,
                    so.angle
                FROM 
                    colonies as col,
                    space_objects as so
                WHERE
                    col.space_object_id = so.id AND
                    col.civilization_id = '$civilization->id'
                    
            "));
        }


        $resp->setContent([
            'objects' => $objects,
            'types' => $types,
            'camera' => [
                'x' => $userUniverseMember->x,
                'y' => $userUniverseMember->y,
                'scale' => $userUniverseMember->scale,
            ],
            'colonies' => $colonies
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

    public function getSpaceObjectModal(Request $req, SpaceObject $spaceObject)
    {

        $ui = UIController::getUI();

        $this->getSpaceObjectModalTitle($spaceObject, $ui);
        $table = $this->getSpaceObjectInfoModalTable($spaceObject, $ui);
        $colonyData = $this->getSpaceObjectColonyInfoModal($req->user(), $spaceObject, $ui);
        $text = $ui->text("Abrakadabra");

        $tabsData = [
            'Характеристики' => [$table],
            'Текст' => [$text],
        ];

        if ($colonyData) {
            $tabsData['Колония'] = $colonyData;
        }

        $tabs =  $ui->tabs($tabsData);

        $ui->addChild($tabs);

        $resp = ApiController::getResp();
        $resp->setContent($ui->getUI());
        $resp->echo();
    }

    public function getSpaceObjectModalTitle($spaceObject, $ui)
    {
        $objectTypes = SpaceObjectType::get()->keyBy('id');
        $ui->setTitle($objectTypes[$spaceObject->space_object_type_id]['runame'] . " " . $spaceObject->name);
    }

    public function getSpaceObjectInfoModalTable($spaceObject, $ui)
    {
        $headers = ['Характеристика', 'Значение'];
        $object = SpaceObjectController::getOne($spaceObject);

        $objectTypes = SpaceObjectType::get()->keyBy('id');

        $compositionTypes = [];
        foreach (explode(";", SpaceObjectPropType::where('name', '=', 'compositionType')->first()->default) as $comp) {
            $compositionTypes[explode(":", $comp)[0]] = explode(":", $comp)[1];
        }

        $tableBody = [
            ['Радиус, тыс. км', SystemController::AU2TKM($object['rad'])],
            ['Масса, м. Земли', $object['mass']],
        ];

        switch ($objectTypes[$object['space_object_type_id']]['name']) {
            case 'planet':

                $tableBody[] = ['Радиус орбиты, а. е.', $object['dist']];
                $tableBody[] = ['Тип состава', $compositionTypes[$object['compositionType']]];

                break;

            case 'star':

                $tableBody[] = ['Температура, тыс. К', $object['temperature']];

                break;
        }


        $table = $ui->table($headers, $tableBody);
        return $table;
    }

    public function getSpaceObjectColonyInfoModal($user, $spaceObject, $ui)
    {
        $colony = Colony::where('space_object_id', $spaceObject->id)
            ->where(
                'civilization_id',
                '=',
                Civilization::where('user_universe_member_id', '=', UserUniverseMember::where('user_id', '=', $user->id)->first()->id)->first()->id
            )
            ->first();

        if (!$colony) {
            return [];
        }

        $colonyTypes = ColonyType::get()->keyBy('id');

        // $header = $ui->h5($colony->name);

        $text = $ui->text($colonyTypes[$colony->colony_type_id]->runame);
        $block = $ui->block($colony->name, [], [$text]);

        $tabsData = [
            "Главное" => [$block]
        ];

        foreach ($this->getColonyProductionCategories($colony, $ui) as $key => $value) {
            $tabsData[$key] = $value;
        }

        $tabs = $ui->tabs($tabsData);

        return [$tabs];
    }

    public function getColonyProductionCategories(Colony $colony, $ui)
    {
        $productionCategories = [];

        foreach (ProductionCategory::whereRaw("id IN (
            SELECT 
                production_category_id 
            FROM 
                colony_type_production_categories 
            WHERE 
                colony_type_id = '$colony->colony_type_id'
        )")->get() as $productionCategory) {
            $productionCategories[$productionCategory->runame] = [$ui->block($productionCategory->runame, [], [$ui->text($productionCategory->name)])];
        }

        return $productionCategories;
    }

    public function updateCamera(Request $request)
    {
        $user = $request->user();

        $userUniverseMember = UserUniverseMember::where('user_id', '=', $user->id)->first();

        $userUniverseMember->x = $request->input('x');
        $userUniverseMember->y = $request->input('y');
        $userUniverseMember->scale = $request->input('scale');

        $userUniverseMember->save();

        $resp = ApiController::getResp();
        $resp->setContent($request->all());
        $resp->echo();
    }
}
