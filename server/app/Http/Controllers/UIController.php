<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UIController extends Controller
{
    static public function getUI()
    {
        return new UI();
    }
}

class UI
{
    public function __construct()
    {
        $this->ui = [
            'title' => "",
            'children' => [],
        ];
    }

    public function setTitle($title)
    {
        $this->ui['title'] = $title;
    }

    protected function getElement($element, $props, $children)
    {
        return [
            'element' => $element,
            'props' => $props,
            'children' => $children
        ];
    }

    public function row($children = [])
    {
        return $this->getElement('row', [], $children);
    }

    public function column($columns = 3, $children = [])
    {
        return $this->getElement('column', ['columns' => $columns], $children);
    }

    public function btn($cls, $text, $action)
    {
        return $this->getElement('button', [
            'cls' => $cls,
            'text' => $text,
            'action' => $action
        ], []);
    }

    public function block($title, $btns, $children = [])
    {
        return $this->getElement(
            'block',
            [
                'title' => $title,
                'btns' => $btns
            ],
            $children
        );
    }

    public function text($text, $format = [])
    {
        return $this->getElement(
            'text',
            [
                'format' => $format
            ],
            $text
        );
    }

    public function block3($title, $btns, $children = [])
    {
        return $this->column(4, [
            $this->block(
                $title,
                $btns,
                $children
            )
        ]);
    }

    public function addChild($child)
    {
        $this->ui['children'][] = $child;
    }

    public function getUI()
    {
        return $this->ui;
    }
}
