import Sortable from 'sortablejs';

window.Sortable = Sortable;

window.Livewire?.directive('sortable', ({el, directive, component}) => {
    // Only fire this handler on the "root" directive.
    if (directive.modifiers.length > 0) {
        return;
    }

    let options = {};

    if (el.hasAttribute('wire:sortable.options')) {
        options = (new Function(`return ${el.getAttribute('wire:sortable.options')};`))();
    }

    el.livewire_sortable = window.Sortable.create(el, {
        ...options,
        draggable: '[wire\\:sortable\\.item]',
        handle: el.querySelector('[wire\\:sortable\\.handle]') ? '[wire\\:sortable\\.handle]' : null,
        sort: true,
        dataIdAttr: 'wire:sortable.item',
        group: {
            pull: false,
            put: false,
            ...options.group,
            name: el.getAttribute('wire:sortable'),
        },
        store: {
            ...options.store,
            set: function (sortable) {
                let items = sortable.toArray().map((value, index) => {
                    return {
                        order: index + 1,
                        value: value,
                    };
                });

                component.$wire.call(directive.method, items);
            },
        },
    });
});

window.Livewire?.directive('sortable-group', ({el, directive, component}) => {
    // Only fire this handler on the "root" group directive.
    if (! directive.modifiers.includes('item-group')) {
        return;
    }

    let options = {};

    if (el.hasAttribute('wire:sortable-group.options')) {
        options = (new Function(`return ${el.getAttribute('wire:sortable-group.options')};`))();
    }

    el.livewire_sortable = window.Sortable.create(el, {
        ...options,
        draggable: '[wire\\:sortable-group\\.item]',
        handle: el.querySelector('[wire\\:sortable-group\\.handle]') ? '[wire\\:sortable-group\\.handle]' : null,
        sort: true,
        dataIdAttr: 'wire:sortable-group.item',
        group: {
            pull: true,
            put: true,
            ...options.group,
            name: el.closest('[wire\\:sortable-group]').getAttribute('wire:sortable-group'),
        },
        onSort: () => {
            let masterEl = el.closest('[wire\\:sortable-group]');

            let groups = Array.from(masterEl.querySelectorAll('[wire\\:sortable-group\\.item-group]')).map((el, index) => {
                return {
                    order: index + 1,
                    value: el.getAttribute('wire:sortable-group.item-group'),
                    items:  el.livewire_sortable.toArray().map((value, index) => {
                        return {
                            order: index + 1,
                            value: value
                        };
                    }),
                };
            });

            component.$wire.call(masterEl.getAttribute('wire:sortable-group'), groups);
        },
    });
});
