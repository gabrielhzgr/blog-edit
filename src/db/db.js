class db {
  constructor() {
    const baseUrl = import.meta.env.VITE_BLOG_API_URL;
    this.post = new Post(baseUrl);
    this.user = new User(baseUrl);
  }
}

class Post {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async delete(id) {
    const url = `${this.baseUrl}/posts/${id}`;
    const response = await fetch(url, { method: "DELETE" });
    const post = await response.json();
    return post;
  }

  async create(data) {
    const url = `${this.baseUrl}/posts/`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const post = await response.json();
    return post;
  }

  async getAll() {
    const url = `${this.baseUrl}/posts/`;
    const response = await fetch(url, { method: "GET" });
    const posts = await response.json();
    return posts;
  }

  async deleteAll() {
    const url = `${this.baseUrl}/posts/`;
    const response = await fetch(url, { method: "DELETE" });
    const posts = await response.json();
    return posts;
  }
}

class User {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async login(credentials) {
    const url = `${this.baseUrl}/users/login`;
    const payload = JSON.stringify(credentials);
    console.log(payload);
    const response = await fetch(url, {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      const { user, token } = await response.json();
      return { user, token };
    } else {
      const error = await response.json();
      throw new Response("ResponseError", {
        status: response.status,
        statusText: error.error,
      });
    }
  }
}

export default new db();
