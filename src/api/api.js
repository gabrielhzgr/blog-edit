class API {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  throw(response, error) {}

  async response(response) {}
}

class Post extends API {
  constructor(baseUrl) {
    super(baseUrl);
  }

  getHeaders() {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) {
      const jwt = JSON.parse(token).token;
      headers["Authorization"] = `Bearer ${jwt}`;
    }

    return headers;
  }

  async create(data) {
    const url = `${this.baseUrl}/posts/`;
    const response = await fetch(url, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      const result = await response.json();
      return result;
    } else {
      let error = await response.json();
      return {
        error: Object.assign(
          new Response(error.name, {
            status: response.status,
            statusText: error.error,
          }),
          { name: error.name },
        ),
      };
    }
  }

  async getPosts(page) {
    const limit = 10;
    const url = `${this.baseUrl}/posts?page=${page}&limit=${limit}`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (response.status == 200) {
      const result = await response.json();
      return result;
    } else {
      let error = await response.json();
      return {
        error: Object.assign(
          new Response(error.name, {
            status: response.status,
            statusText: error.error,
          }),
          { name: error.name },
        ),
      };
    }
  }

  async getPost(id) {
    const url = `${this.baseUrl}/posts/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (response.status == 200) {
      const result = await response.json();
      return result;
    } else {
      let error = await response.json();
      return {
        error: Object.assign(
          new Response(error.name, {
            status: response.status,
            statusText: error.error,
          }),
          { name: error.name },
        ),
      };
    }
  }
}

class User extends API {
  constructor(baseUrl) {
    super(baseUrl);
  }

  async login(credentials) {
    const url = `${this.baseUrl}/users/login`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //const response = await this.api.request(url, "POST", credentials);

    if (response.status == 200) {
      const { user, token } = await response.json();
      return { user, token };
    } else {
      let error = await response.json();
      return {
        error: Object.assign(
          new Response(error.name, {
            status: response.status,
            statusText: error.error,
          }),
          { name: error.name },
        ),
      };
    }
  }
}

//const baseUrl = import.meta.env.VITE_BLOG_API_URL;
const baseUrl = import.meta.env.VITE_DEV_API_URL;
const user = new User(baseUrl);
const post = new Post(baseUrl);

export default { user, post };
