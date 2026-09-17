import { Livewire, Alpine } from '@livewire';
import focus from '@alpinejs/focus';
import examplo from './examplo.js';

Alpine.plugin(focus);

Alpine.data('examplo', examplo);

export default Livewire;
