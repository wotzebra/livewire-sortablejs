# Livewire Sortable.js

[![Latest Version on NPM](https://img.shields.io/npm/v/@wotz%2Flivewire-sortablejs.svg?style=flat-square)](https://npmjs.com/package/@wotz%2Flivewire-sortablejs)
[![NPM total downloads](https://img.shields.io/npm/dt/@wotz%2Flivewire-sortablejs.svg?style=flat-square)](https://www.npmjs.com/package/@wotz%2Flivewire-sortablejs)
[![NPM downloads per month](https://img.shields.io/npm/dm/@wotz%2Flivewire-sortablejs.svg?style=flat-square)](https://www.npmjs.com/package/@wotz%2Flivewire-sortablejs)

A plugin/wrapper around [Sortable.js](https://github.com/SortableJS/Sortable) package.

## Why use this instead of Livewire's official [livewire-sortable](https://github.com/livewire/sortable) package?

The `livewire-sortable` package uses Shopify's sortable package. We noticed some issues with that package compared to Sortable.js:
- Shopify's sortable package does not retain an item's original height and width while dragging. Sortable.js does this by default.
- Sortable.js also works well in combination with Alpine.js while Shopify's sortable package can cause errors while dragging, especially when using Alpine.js `x-for` method in an draggable item.

**Do you want to make the switch from `livewire-sortable` to `livewire-sortable.js`? That's easy, because this package works exactly the same!** The only difference is the javascript package it uses in the background. You will not have to change any Livewire attributes or methods!

## Installation

### CDN

```html
<script src="https://unpkg.com/@wotz/livewire-sortablejs@1.0.0/dist/livewire-sortable.js"></script>
```

> If you use Livewire v2, you need to use v0.2.

### NPM

```bash
npm install @wotz/livewire-sortablejs --save-dev
```

Import the package in your bundle:

```js
import '@wotz/livewire-sortablejs';

// or

require('@wotz/livewire-sortablejs');
```

## Usage

### One group with draggable items

When you only have one list of draggable items (e.g. to-do list), you have to add the following attributes to your html:
- `wire:sortable="methodName"`: This attribute should be added to the html element that encapsulates all draggable items. The value of this attribute is the Livewire method that will be executed when an item has been dragged.
- `wire:sortable.options`: This optional attribute can be added to the html element that has the `wire:sortable` attribute. With the different [options](https://github.com/SortableJS/Sortable#options) of Sortable.js, you can use this attribute to customize how the items are dragged and sorted.
- `wire:sortable.item="itemIdentifier"`: This atttribute should be added to each individual draggable item. The value of this attribute will be used to inform you about the updated order.
- `wire:sortable.handle`: This is an optional attribute. If you provide this attribute, then you will only be able to drag an item by dragging this html element. If you do not provide it, then the complete item will draggable.

```blade
<ul wire:sortable="updateTaskOrder" wire:sortable.options="{ animation: 100 }">
    @foreach ($tasks as $task)
        <li wire:sortable.item="{{ $task->id }}" wire:key="task-{{ $task->id }}">
            <h4>{{ $task->title }}</h4>
            <button wire:sortable.handle>drag</button>
        </li>
    @endforeach
</ul>
```

When the order is updated, you will receive the following array structure in your Livewire method:

```php
[
    [
        'order' => 1,   // order of item (starts at 1, not 0)
        'value' => 20,  // item id
    ],
]
```

### Multiple groups with draggable items

When you have multiple lists, each with items that can be moved between those different lists, you have to add the following attributes to your html:
- `wire:sortable-group="methodName"`: This attribute should be added to the html element that encapsulates all lists. The value of this attribute is the Livewire method that will be executed when an item has been dragged.
- `wire:sortable-group.item-group="groupIdentifier"`: This atttribute should be added to the root element of a list with draggable items. The value of this attribute will be used to inform you about the updated order.
- `wire:sortable-group.options`: This optional attribute can be added to every html element that has the `wire:sortable-group.item-group` attribute. With the different [options](https://github.com/SortableJS/Sortable#options) of Sortable.js, you can use this attribute to customize how the items are dragged and sorted.
- `wire:sortable-group.item="itemIdentifier"`: This atttribute should be added to each individual draggable item in each list. The value of this attribute will be used to inform you about the updated order.
- `wire:sortable-group.handle`: This is an optional attribute. If you provide this attribute, then you will only be able to drag an item by dragging this html element. If you do not provide it, then the complete item will draggable.

```blade
<div wire:sortable-group="updateTaskOrder">
    @foreach ($groups as $group)
        <div wire:key="group-{{ $group->id }}">
            <h4>{{ $group->label }}</h4>

            <ul wire:sortable-group.item-group="{{ $group->id }}" wire:sortable-group.options="{ animation: 100 }">
                @foreach ($group->tasks()->orderBy('order')->get() as $task)
                    <li wire:sortable-group.item="{{ $task->id }}" wire:key="task-{{ $task->id }}">
                        <span>{{ $task->title }}</span>
                        <button wire:sortable-group.handle>drag</button>
                    </li>
                @endforeach
            </ul>
        </div>
    @endforeach
</div>
```

When an item is dragged, you will receive the following array structure in the Livewire method you provided to the `wire:sortable-group` directive (in this example, the `updateTaskOrder` method):

```php
[
    [
        'order' => 1,            // order of group (starts at 1, not 0)
        'value' => 20,           // group id
        'items' => [
            [
                'order' => 1,    // order of item within group (starts at 1, not 0)
                'value' => 50,   // item id
            ]
        ]
    ]
]
```

### Multiple draggable groups with draggable items

When you have multiple lists, each with items that can be moved between those different lists and the lists themselves also need to be draggable, you have to add the following attributes to your html:
- `wire:sortable="methodName"`: This attribute should be added to the html element that encapsulates all draggable groups. The value of this attribute is the Livewire method that will be executed when a group has been dragged.
- `wire:sortable.options`: This optional attribute can be added to the html element that has the `wire:sortable` attribute. With the different [options](https://github.com/SortableJS/Sortable#options) of Sortable.js, you can use this attribute to customize how the groups are dragged and sorted.
- `wire:sortable.item="groupIdentifier"`: This atttribute should be added to each individual draggable group. The value of this attribute will be used to inform you about the updated group order.
- `wire:sortable.handle`: This is an optional attribute. If you provide this attribute, then you will only be able to drag a group by dragging this html element. If you do not provide it, then the complete group will draggable.

- `wire:sortable-group="methodName"`: This attribute should be added to the html element that encapsulates all lists. The value of this attribute is the Livewire method that will be executed when an item has been dragged.
- `wire:sortable-group.item-group="groupIdentifier"`: This atttribute should be added to the root element of a list with draggable items. The value of this attribute will be used to inform you about the updated order.
- `wire:sortable-group.options`: This optional attribute can be added to every html element that has the `wire:sortable-group.item-group` attribute. With the different [options](https://github.com/SortableJS/Sortable#options) of Sortable.js, you can use this attribute to customize how the items are dragged and sorted.
- `wire:sortable-group.item="itemIdentifier"`: This atttribute should be added to each individual draggable item in each list. The value of this attribute will be used to inform you about the updated order.
- `wire:sortable-group.handle`: This is an optional attribute. If you provide this attribute, then you will only be able to drag an item by dragging this html element. If you do not provide it, then the complete item will draggable.

```blade
<div wire:sortable="updateGroupOrder" wire:sortable-group="updateTaskOrder" wire:sortable.options="{ animation: 50 }">
    @foreach ($groups as $group)
        <div wire:sortable.item="{{ $group->id }}" wire:key="group-{{ $group->id }}">
            <h4>{{ $group->label }}</h4>
            <button wire:sortable.handle>drag group</button>

            <ul wire:sortable-group.item-group="{{ $group->id }}" wire:sortable-group.options="{ animation: 100 }">
                @foreach ($group->tasks()->orderBy('order')->get() as $task)
                    <li wire:sortable-group.item="{{ $task->id }}" wire:key="task-{{ $task->id }}">
                        <span>{{ $task->title }}</span>
                        <button wire:sortable-group.handle>drag item</button>
                    </li>
                @endforeach
            </ul>
        </div>
    @endforeach
</div>
```

When an item is dragged, you will receive the following array structure in the Livewire method you provided to the `wire:sortable-group` directive (in this example, the `updateTaskOrder` method):

```php
[
    [
        'order' => 1,            // order of group (starts at 1, not 0)
        'value' => 20,           // group id
        'items' => [
            [
                'order' => 1,    // order of item within group (starts at 1, not 0)
                'value' => 50,   // item id
            ]
        ]
    ]
]
```

When a group is dragged, you will receive the following array structure in the Livewire method you provided to the `wire:sortable` directive (in this example, the `updateGroupOrder` method):

```php
[
    [
        'order' => 1,            // order of group (starts at 1, not 0)
        'value' => 20,           // group id
    ]
]
```

## Building

```bash
npm run build
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Credits

This package is inspired by Livewire's official [livewire-sortable](https://github.com/livewire/sortable) plugin.

- [Günther Debrauwer](https://github.com/gdebrauwer)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
