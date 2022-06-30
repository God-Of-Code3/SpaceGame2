<?php

namespace App\Http\Controllers;

use App\Models\SpaceObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SystemController extends Controller
{

    static protected function getImageAndColor($planetType)
    {
        $images = [
            0 => ['images/planets/alive-standart/planet2.png', 'images/planets/alive-standart/planet3.png', 'images/planets/alive-standart/planet4.png', 'images/planets/alive-standart/planet5.png', 'images/planets/alive-standart/planet6.png', 'images/planets/alive-standart/planet7.png', 'images/planets/alive-standart/planet8.png', 'images/planets/alive-standart/planet9.png', 'images/planets/alive-standart/planet10.png'],
            1 => ['images/planets/standart-gray/planet.png', 'images/planets/standart-gray/planet2.png', 'images/planets/standart-gray/planet3.png', 'images/planets/standart-gray/planet4.png', 'images/planets/standart-gray/planet5.png'],
            2 => ['images/planets/standart-red/planet.png', 'images/planets/standart-red/planet2.png', 'images/planets/standart-red/planet3.png', 'images/planets/standart-red/planet4.png', 'images/planets/standart-red/planet5.png'],
            3 => ['images/planets/dense-atmosphere/planet.png', 'images/planets/dense-atmosphere/planet2.png', 'images/planets/dense-atmosphere/planet3.png', 'images/planets/dense-atmosphere/planet4.png', 'images/planets/dense-atmosphere/planet5.png'],
            4 => ['images/planets/not-atmosphere/planet.png', 'images/planets/not-atmosphere/planet2.png', 'images/planets/not-atmosphere/planet3.png', 'images/planets/not-atmosphere/planet4.png', 'images/planets/not-atmosphere/planet5.png'],
            5 => ['images/planets/cold/planet.png', 'images/planets/cold/planet2.png', 'images/planets/cold/planet3.png', 'images/planets/cold/planet4.png', 'images/planets/cold/planet5.png'],
            6 => ['images/planets/alive-water/planet.png', 'images/planets/alive-water/planet2.png', 'images/planets/alive-water/planet3.png', 'images/planets/alive-water/planet4.png', 'images/planets/alive-water/planet5.png', 'images/planets/alive-water/planet6.png', 'images/planets/alive-water/planet7.png', 'images/planets/alive-water/planet8.png', 'images/planets/alive-water/planet9.png', 'images/planets/alive-water/planet10.png'],
            7 => ['images/planets/alive-red/planet.png', 'images/planets/alive-red/planet2.png', 'images/planets/alive-red/planet3.png', 'images/planets/alive-red/planet4.png', 'images/planets/alive-red/planet5.png', 'images/planets/alive-red/planet6.png', 'images/planets/alive-red/planet7.png', 'images/planets/alive-red/planet8.png', 'images/planets/alive-red/planet9.png', 'images/planets/alive-red/planet10.png'],
            8 => ['images/planets/alive-cold/planet.png', 'images/planets/alive-cold/planet2.png', 'images/planets/alive-cold/planet3.png', 'images/planets/alive-cold/planet4.png', 'images/planets/alive-cold/planet5.png', 'images/planets/alive-cold/planet6.png', 'images/planets/alive-cold/planet7.png', 'images/planets/alive-cold/planet8.png', 'images/planets/alive-cold/planet9.png', 'images/planets/alive-cold/planet10.png'],
            9 => ['images/planets/gas-giants/planet.png', 'images/planets/gas-giants/planet2.png', 'images/planets/gas-giants/planet3.png', 'images/planets/gas-giants/planet4.png', 'images/planets/gas-giants/planet5.png', 'images/planets/gas-giants/planet6.png'],
            10 => ['images/planets/gas-giants/planet7.png', 'images/planets/gas-giants/planet8.png', 'images/planets/gas-giants/planet9.png', 'images/planets/gas-giants/planet10.png', 'images/planets/gas-giants/planet11.png', 'images/planets/gas-giants/planet12.png'],
            11 => ['images/planets/gas-giants/planet13.png', 'images/planets/gas-giants/planet14.png', 'images/planets/gas-giants/planet15.png'],
            12 => ['images/planets/gas-giants/planet16.png', 'images/planets/gas-giants/planet17.png', 'images/planets/gas-giants/planet18.png'],
            13 => ['images/planets/gas-giants/planet19.png', 'images/planets/gas-giants/planet20.png', 'images/planets/gas-giants/planet21.png', 'images/planets/gas-giants/planet22.png', 'images/planets/gas-giants/planet24.png', 'images/planets/gas-giants/planet25.png', 'images/planets/gas-giants/planet26.png', 'images/planets/gas-giants/planet27.png', 'images/planets/gas-giants/planet28.png', 'images/planets/gas-giants/planet29.png', 'images/planets/gas-giants/planet30.png'],
        ];

        $colors = [
            0 => "#37D8D1",
            1 => "#c7c7c7",
            2 => "#A29691",
            3 => "#EDB055",
            4 => "#CF4E17",
            5 => "#7B9DA3",
            6 => "#37D8D1",
            7 => "#B0A0B3",
            8 => "#BCDAE4",
            9 => "#CDCDCD",
            10 => "#CDCDCD",
            11 => "#2D5DC5",
            12 => "#65D1F3",
            13 => "#F0F0F0"
        ];

        $color = $colors[$planetType];
        $imgs = $images[$planetType];

        return [
            'image' => 'http://127.0.0.1:8000/storage/' . $imgs[rand(0, count($imgs) - 1)],
            'color' => $color
        ];
    }

    static public function starColor($starClass)
    {
        $classes = [
            "O" => "#007dff",
            "B" => "#9ce9ff",
            "A" => "#f0f0f0",
            "F" => "#ffff99",
            "G" => "#ffff00",
            "K" => "#ffa500",
            "M" => "#ff2400",
        ];

        return $classes[$starClass];
    }

    static public function AU2TKM($au)
    {
        return $au * 149000;
    }

    static public function TKM2AU($tkm)
    {
        return $tkm / 149000;
    }

    static public function AU2LY($au)
    {
        return $au / 63018.87;
    }

    static public function LY2AU($ly)
    {
        return $ly * 63018.87;
    }

    static public function starClass($temp)
    {
        if ($temp < 3.5)
            return "M";
        if ($temp < 5)
            return "K";
        if ($temp < 6)
            return "G";
        if ($temp < 7.5)
            return "F";
        if ($temp < 10)
            return "A";
        if ($temp < 30)
            return "B";
        return "O";
    }

    static protected function RandomString($ln)
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randstring = '';
        for ($i = 0; $i < $ln; $i++) {
            $randstring .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randstring;
    }

    static protected function RandomStarName()
    {
        return SystemController::RandomString(4) . "-" . rand(100, 999);
    }

    static protected function PlanetName($starName, $n)
    {
        $alphabet = "bcdefghijklmnopqrstuvwxyz";
        return $starName . "-" . $alphabet[$n];
    }

    static public function generateSystem($universe)
    {
        $data = SystemController::generateStar($universe);
        $star = SpaceObjectController::create($data);
        $data['id'] = $star->id;

        $planetNumber = rand(0, 9);
        for ($i = 0; $i < $planetNumber; $i++) {
            $planetData = SystemController::generatePlanet($data, $i, $universe);
            SpaceObjectController::create($planetData);
        }
    }

    static protected function generateStar($universe)
    {
        $solarRadius = SystemController::TKM2AU(109 * 6);
        $solarMass = 333000;

        $starTemperature = rand(1, 35);
        $starRadius = $solarRadius;

        if ($starTemperature > 30) {
            $starRadius = $solarRadius * 10 * rand(1, 10);
        } elseif ($starTemperature > 5) {
            $starRadius = $solarRadius * 10 ** (($starTemperature - 5) / 25);
        } else {
            $starRadius = $solarRadius * ($starTemperature / 5);
        }

        $starClass = SystemController::starClass($starTemperature);
        $starColor = SystemController::starColor($starClass);

        $rad = SystemController::LY2AU(5);

        $systemX = rand(-$rad, $rad);
        $systemY = rand(-$rad, $rad);

        $starMass = $solarMass * ($starRadius / $solarRadius) ** (1 / 3);

        $data = [
            'name' => SystemController::RandomStarName(),
            'universe_id' => $universe->id,

            'x' => $systemX,
            'y' => $systemY,
            'rad' => $starRadius,

            'dist' => 0,
            'angle' => 0,
            'period' => 0,
            'space_object_type_id' => 2,

            'temperature' => $starTemperature,
            'star_class' => $starClass,
            'color' => $starColor,
            'mass' => $starMass,
        ];

        return $data;
    }

    static protected function generatePlanet($starData, $n, $universe)
    {
        $earthRadius = SystemController::TKM2AU(6);
        $earthMass = 1;

        $compositionTypes = ['ice', 'rock', 'gase'];

        $planetCompositionType = $compositionTypes[rand(0, count($compositionTypes) - 1)];
        $planetRadius = $earthRadius;
        $planetMass = $earthMass;
        $planetType = 0;

        switch ($planetCompositionType) {
            case 'ice':
                if (rand(0, 1) == 0) { // Generating earth-like ice planet
                    $planetRadius = $earthRadius * rand(50, 300) / 100;
                    $planetMass = $earthMass * ($planetRadius / $earthRadius) ** 3;

                    $planetType = 5;
                } else { // Generating uran-like ice planet
                    $planetRadius = $earthRadius * rand(40, 100) / 10;
                    $planetMass = $earthMass * ($planetRadius / $earthRadius) ** 3 / 4.5;

                    $planetType = 11;
                }
                break;
            case 'rock':
                $planetRadius = $earthRadius * rand(50, 150) / 100;
                $planetMass = $earthMass * ($planetRadius / $earthRadius) ** 3;

                $type = rand(0, 4);
                switch ($type) {
                    case 0:
                        $planetType = 0;
                        break;
                    case 1:
                        $planetType = 6;
                        break;
                    case 2:
                        $planetType = 2;
                        break;
                    case 3:
                        $planetType = 4;
                        break;
                    case 4:
                        $planetType = 1;
                        break;
                }

                break;
            case 'gase':
                $planetRadius = $earthRadius * rand(400,  800) / 10;
                $planetMass = $earthMass * ($planetRadius / $earthRadius) ** 3 / 5.45;

                $planetType = 9;
                break;
        }

        $dist = 0.3;
        $planetOrbitDist = ($dist + 0.1) + $dist * (2 ** ($n - 1)) * rand(990, 1010) / 1000;

        $planetAngle = rand(0, 360) / 180 * pi();
        $planetPeriod = 1;

        $planetDecoration = SystemController::getImageAndColor($planetType);
        $planetImage = $planetDecoration['image'];
        $planetColor = $planetDecoration['color'];


        $data = [
            'name' => SystemController::PlanetName($starData['name'], $n),
            'universe_id' => $universe->id,
            'space_object_id' => $starData['id'],

            'x' => $starData['x'],
            'y' => $starData['y'],
            'rad' => $planetRadius,

            'dist' => $planetOrbitDist,
            'angle' => $planetAngle,
            'period' => $planetPeriod,
            'space_object_type_id' => 3,

            'color' => $planetColor,
            'image' => $planetImage,
            'mass' => $planetMass,
            'compositionType' => $planetCompositionType,
        ];

        return $data;
    }
}
