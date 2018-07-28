export async function updateUserInfo(user) {
	return await fetch('http://localhost:8000/api/update/' + user._id, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userInfo: user
    })
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
};

