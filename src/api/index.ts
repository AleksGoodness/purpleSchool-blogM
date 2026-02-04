import { notFound } from 'next/navigation'

import type { FormInputs } from '@/app/(routes)/[id]/components/form/Form.interfaces'

import { API } from './api'

export const updateLike = async (id: number, rating: number) => {
	fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({
			rating: rating,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((response) => response.json())
		// eslint-disable-next-line no-console
		.then((json) => console.log(json))
}
export const getData = async <T>(path: string): Promise<T> => {
	const resp = await fetch(path)

	if (!resp) {
		return notFound()
	}
	const returnedData = await resp.json()
	return returnedData
}

export const postComment = async (data: FormInputs): Promise<{ message: string }> => {
	const resp = await fetch(API.posts, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	})

	if (resp.ok) {
		return { message: `success with code: ${resp.status}` }
	}

	return { message: 'something go wrong with server' }
}
