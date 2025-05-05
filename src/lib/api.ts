export async function fetchWorkspaces() {
    try {
        const response = await fetch('https://worklocate-315a35b40e37.herokuapp.com/api/workspace/all');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();

        // Validate response structure
        if (!res || !Array.isArray(res.data)) {
            throw new Error('Invalid data structure received');
        }

        return res.data.slice(0, 10); // Directly return the data array

    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return []; // Return empty array if there's an error
    }
}

export async function fetchWorkspaceDetails() {

}

export async function createBooking() {

}
