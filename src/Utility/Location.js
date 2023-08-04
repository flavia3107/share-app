const GOOGLE_API = 'AIzaSyCJpkEA3-h5QwLGwQqqmgLAsY3r8mPci00';

export async function getCoordsFromAddress(address) {
    const urlAddress = encodeURI(address);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API}`);

    if (!response) {
        throw new Error('Failed to fetch coordinates. Please try again!');
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const coordinates = data.result[0].geometry.location;
    return coordinates;
}