# Changelog

All notable changes to `livewire-sortablejs` will be documented in this file.

## 0.4.1 - 2023-12-26

- Update sortablejs from v1.15.0 to v1.15.1 (https://github.com/nextapps-be/livewire-sortablejs/pull/47)

## 0.4.0 - 2023-10-26

- Always call master element's livewire component when dragging items between groups (as group can be a nested livewire component) (https://github.com/nextapps-be/livewire-sortablejs/pull/44)

## 0.3.6 - 2023-10-26

- Prevent calling livewire component from both the source and target group after item is dragged (https://github.com/nextapps-be/livewire-sortablejs/pull/40)

## 0.3.5 - 2023-10-19

- Add support for Livewire's new morph markers (https://github.com/nextapps-be/livewire-sortablejs/pull/37)

## 0.3.4 - 2023-10-18

- Ensure Livewire's morph markers are handled correctly (https://github.com/nextapps-be/livewire-sortablejs/pull/36)

## 0.3.3 - 2023-10-18

- Ensure `handle` option works when a group does not have any items on initial load (https://github.com/nextapps-be/livewire-sortablejs/pull/35)

## 0.2.3 - 2023-10-18

- Ensure `handle` option works when a group does not have any items on initial load (https://github.com/nextapps-be/livewire-sortablejs/pull/34)

## 0.3.2 - 2023-10-17

- Allow overriding `sort` option via `wire:sortable.options` and `wire:sortable-group.options` attributes (https://github.com/nextapps-be/livewire-sortablejs/pull/32)

## 0.2.2 - 2023-10-17

- Allow overriding `sort` option via `wire:sortable.options` and `wire:sortable-group.options` attributes (https://github.com/nextapps-be/livewire-sortablejs/pull/32)

## 0.3.1 - 2023-09-29

- Do not throw an error when Livewire is not present on the page (https://github.com/nextapps-be/livewire-sortablejs/pull/30)

## 0.3.0 - 2023-08-25

- Add support for Livewire v3 (and drop support for Livewire v2) (https://github.com/nextapps-be/livewire-sortablejs/pull/26)

## 0.2.1 - 2023-08-25

- Merge nested options provided in `wire:sortable.options` and `wire:sortable-group.options` attributes (https://github.com/nextapps-be/livewire-sortablejs/pull/23)

## 0.2.0 - 2022-06-22

- Add `wire:sortable.options` and `wire:sortable-group.options` attributes (https://github.com/nextapps-be/livewire-sortablejs/pull/11)

## 0.1.1 - 2021-08-22

- Fixes in package.json

## 0.1.0 - 2021-08-22

- Initial release
