const DEFAULT_OPTIONS: RequestInit = {
	credentials: 'same-origin',
	mode: 'cors',
	headers: {
		'content-type': 'application/json'
	}
};

export async function get(action: RequestInfo, init?: RequestInit) {
	const options = {
		method: 'GET',
		...DEFAULT_OPTIONS,
		...init
	};

	return fetch(action, options as RequestInit);
}

export async function post(action: RequestInfo, body?: object, init?: RequestInit) {
	const options = {
		method: 'POST',
		...DEFAULT_OPTIONS,
		...init
	};

	if (body) {
		options['body'] = JSON.stringify(body);
	}

	return fetch(action, options as RequestInit);
}
