import { writable } from 'svelte/store';
import type { Item } from '$lib/types';

export const items = writable<Item[]>([]);