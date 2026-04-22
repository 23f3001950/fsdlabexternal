const API_BASE_URL = 'http://localhost:5004';

export async function fetchNotes(page = 1, limit = 5) {
  const response = await fetch(`${API_BASE_URL}/api/notes?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`);
  }
  return response.json();
}
