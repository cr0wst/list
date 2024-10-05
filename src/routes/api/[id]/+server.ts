import { json } from '@sveltejs/kit';
import { items } from '$lib/server/cache';

export const DELETE = async ({ params }) => {
	const index = items.findIndex((item) => item.id === params.id);
	if (index !== -1) {
		items.splice(index, 1);
	}
	return json(items);
}

export const PATCH = async ({ params, request }) => {
	const index = items.findIndex((item) => item.id === params.id);
	if (index !== -1) {
		const item = await request.json();
		items[index] = { ...items[index], ...item };
	}
	return json(items);
}