export async function fetchWorkspaces() {
    try {
        const response = await fetch('https://worklocate-315a35b40e37.herokuapp.com/api/workspace/all');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();
        console.log("API raw response:", res); // Optional for debugging

        // Validate response structure
        if (!res || !Array.isArray(res.workingSpaces)) {
            throw new Error('Invalid data structure received');
        }

        return res.workingSpaces.slice(0, 5); // Use the correct key

    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return [];
    }
}


export async function fetchWorkspaceDetails(id: string) {
    try {
        const response = await fetch(`https://worklocate-315a35b40e37.herokuapp.com/api/workspace/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();

        // Validate response structure
        if (!res || !Array.isArray(res.data)) {
            throw new Error('Invalid data structure received');
        }
        console.log(res.data);
        return res.data;

    } catch (error) {
        console.error('Error fetching workspace details:', error);
        return null; // Return null if there's an error
    }
}


export async function createBooking() {

}
