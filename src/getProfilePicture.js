export async function getProfilePicture(id) {
  return await fetch('http://localhost:8000/api/profilePicture/' + id, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => {
    if (response.status === 400) {
      throw new Error(`Could not fetch data`);
    }
    return response.json();
  })
  .catch((error) => {
    console.log("Request failed", error);
  })
}