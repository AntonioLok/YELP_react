export async function register(user) {
	return await fetch('http://localhost:8000/api/sign-up', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user.username,
      name: user.name,
      lastName: user.lastName,
      password: user.password,
      dateJoined: new Date().toJSON().slice(0,10).replace(/-/g,'/')
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

