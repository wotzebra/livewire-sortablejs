# Livewire Sortable.js

A plugin/wrapper around [Sortable.js](https://github.com/SortableJS/Sortable) package.

## Why not use Livewire's official livewire-sortable package?

The `livewire-sortable` package uses Shopify's sortable package. We noticed some issues with that package compared to Sortable.js:
- Shopify's sortable package does not retain an item's original height and width while dragging. Sortable.js does this by default.
- Sortable.js also works well in combination with Alpine.js while Shopify's sortable package can cause errors while dragging, especially when using Alpine.js `x-for` method in an draggable item.

**Do you want to make the switch from `livewire-sortable` to `livewire-sortable.js`? That's easy, because this package works exactly the same!** The only difference is the javascript package it uses in the background. You will not have to change any Livewire attributes or methods!

## Installation

### NPM

```bash
npm install livewire-sortablejs --save-dev
```

Import the package in your bundle:

```js
import 'livewire-sortablejs';

// or

require('livewire-sortablejs');
```

## Usage

### One group with draggable items

When you only have one list of draggable items (e.g. to-do list), you have to add the following attributes to your html:
- `wire:sortable="methodName"`: This attribute should be added to the html element that encapsulates all draggable items. The value of this attribute is the Livewire method that will be executed when an item has been dragged.
- `wire:sortable.item="itemIdentifier"`: This atttribute should be added to each individual draggable item. The value of this attribute will be used to inform you about the updated order.
- `wire:sortable.handle`: This is an optional attribute. If you provide this attribute, then you will only be able to drag an item by dragging this html element. If you do not provide it, then the complete item will draggable.

```blade
<ul wire:sortable="updateTaskOrder">
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

When you have multiple lists, each with items that can be moved between those different lists (e.g. Trello), you have to add the following attributes to your html:
- `wire:sortable-group="methodName"`: This attribute should be added to the html element that encapsulates all lists with. The value of this attribute is the Livewire method that will be executed when an item has been dragged.
- `wire:sortable-group.item-group="groupIdentifier"`: This atttribute should be added to the root element of a list with draggable items. The value of this attribute will be used to inform you about the updated order.
- `wire:sortable-group.item="itemIdentifier"`: This atttribute should be added to each individual draggable item in each list. The value of this attribute will be used to inform you about the updated order.
- `wire:sortable.handle`: This is an optional attribute. If you provide this attribute, then you will only be able to drag an item by dragging this html element. If you do not provide it, then the complete item will draggable.

```blade
<div wire:sortable-group="updateTaskOrder" style="display: flex">
    @foreach ($groups as $group)
        <div wire:sortable.item="{{ $group->id }}" wire:key="group-{{ $group->id }}">
            <h4>{{ $group->label }}</h4>

            <ul wire:sortable-group.item-group="{{ $group->id }}">
                @foreach ($group->tasks()->orderBy('order')->get() as $task)
                    <li wire:sortable-group.item="{{ $task->id }}" wire:key="task-{{ $task->id }}">
                        <span>{{ $task->title }}</span>
                        <button wire:sortable.handle>drag</button>
                    </li>
                @endforeach
            </ul>
        </div>
    @endforeach
</div>
```

When the order is updated, you will receive the following array structure in your Livewire method:

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
