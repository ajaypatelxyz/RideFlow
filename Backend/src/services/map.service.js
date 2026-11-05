const axios = require('axios');

const getAddressCoordinate = async (address) => {
	if (typeof address !== 'string' || !address.trim()) {
		throw new Error('A valid address is required');
	}

	const apiKey = process.env.GOOGLE_MAPS_API_KEY;

	if (!apiKey) {
		throw new Error('GOOGLE_MAPS_API_KEY is not configured');
	}

	const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
		params: {
			address: address.trim(),
			key: apiKey,
		},
	});

	if (data.status !== 'OK' || !data.results?.[0]?.geometry?.location) {
		throw new Error(data.error_message || `Google Geocoding API returned ${data.status}`);
	}

	const { lat, lng } = data.results[0].geometry.location;
	return { lat, lng };
};

const getDistanceTime = async (origin, destination) => {
	if (typeof origin !== 'string' || !origin.trim() ||
		typeof destination !== 'string' || !destination.trim()) {
		throw new Error('Origin and destination are required');
	}

	const apiKey = process.env.GOOGLE_MAPS_API_KEY;

	if (!apiKey) {
		throw new Error('GOOGLE_MAPS_API_KEY is not configured');
	}

	const { data } = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
		params: {
			origins: origin.trim(),
			destinations: destination.trim(),
			key: apiKey,
		},
	});

	if (data.status !== 'OK') {
		throw new Error(data.error_message || `Google Distance Matrix API returned ${data.status}`);
	}

	const result = data.rows?.[0]?.elements?.[0];

	if (!result || result.status !== 'OK') {
		throw new Error(result?.status || 'Distance and time are unavailable for this route');
	}

	return result;
};

const getAutoCompleteSuggestions = async (input) => {
	if (typeof input !== 'string' || !input.trim()) {
		throw new Error('Query is required');
	}

	const apiKey = process.env.GOOGLE_MAPS_API_KEY;

	if (!apiKey) {
		throw new Error('GOOGLE_MAPS_API_KEY is not configured');
	}

	const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
		params: {
			input: input.trim(),
			key: apiKey,
		},
	});

	if (data.status === 'ZERO_RESULTS') {
		return [];
	}

	if (data.status !== 'OK' || !Array.isArray(data.predictions)) {
		throw new Error(data.error_message || `Google Places API returned ${data.status}`);
	}

	return data.predictions;
};

module.exports = { getAddressCoordinate, getDistanceTime, getAutoCompleteSuggestions };
