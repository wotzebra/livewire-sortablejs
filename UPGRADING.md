# Upgrading

## From v0.3 to v0.4

In v0.3, when your groups (= elements with the `wire:sortable-group.item-group` attribute) were in nested Livewire components while the element with the `wire:sortable-group` attribute was located in a parent Livewire component, then the update-method was called on the nested Livewire components after dragging an item. In v0.4, the package now calls the update-method on the parent Livewire component that contains the element with the `wire:sortable-group` attribute.
