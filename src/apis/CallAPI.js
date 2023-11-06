const API_BASE_URL = 'https://b5241578-0511-44d5-84f1-2b6038167b57.mock.pstmn.io';

export async function getTask() {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        const data = await response.json();
        return data
    }
    catch (error) {
        console.log(error);
    }
}
