import { json } from '@sveltejs/kit';
import { items } from '$lib/server/cache';
import crypto from 'crypto';


export const GET = async () => {
	return json(items);
};

export const POST = async ({ request }) => {
	const id = crypto.randomUUID();
	const item = await request.json();

	items.push({ id, ...item, createdAt: new Date() });

	return json(items);
};

export const DELETE = async ({ params }) => {
	// Remove all items
	items.splice(0, items.length);

	return json(items);
};