<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CRUDController extends Controller
{
    public function getTables()
    {
        $resp = ApiController::getResp();

        $resp->setContent([
            [
                'table' => 'universe',
                'title' => 'Вселенные'
            ],
            [
                'table' => 'space_object_type',
                'title' => 'Типы объектов'
            ],
            [
                'table' => 'space_object_prop_type',
                'title' => 'Типы значений'
            ],
            [
                'table' => 'user',
                'title' => 'Пользователи'
            ],
            [
                'table' => 'colony_type',
                'title' => 'Тип колоний'
            ],
        ]);
        $resp->echo();
    }

    static public function getTableData()
    {
        return [
            'tableName' => "Таблица",
            'columns' => [
                'id' => ['ID', 'number'],
                'name' => ['Название', 'text'],
            ],

            'actions' => [
                'create',
                'update',
                'delete',
                'read'
            ]
        ];
    }
}
