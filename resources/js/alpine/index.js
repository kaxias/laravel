import Alpine from 'alpinejs';
import examplo from './examplo.js';

export function registerAlpineComponents() {
    Alpine.data('examplo', examplo);
}

export default Alpine;
