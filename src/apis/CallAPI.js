const API_BASE_URL = 'https://b5241578-0511-44d5-84f1-2b6038167b57.mock.pstmn.io';

export async function getTask() {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function addTask(taskText) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: taskText }),
        });

        if (!response.ok) {
            throw new Error(`Failed to add task. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
