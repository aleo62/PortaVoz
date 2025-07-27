import axios from "axios";

export class Server {
    // BASE URL
    private static baseUrl = "http://localhost:4000/api/v1/";

    /* POSTS ENDPOINTS -----------> */

    // GET all Posts
    static async getAllPosts(token: string) {
        const res = await axios.get(`${this.baseUrl}posts`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    // GET Post by ID
    static async getPostById(id: string, token: string) {
        return (
            await axios.get(`${this.baseUrl}posts/${id}`, {
                headers: { authorization: `Bearer ${token}` },
            })
        ).data;
    }

    // DELETE Post by ID
    static async deletePostById(id: string, token: string) {
        return (
            await axios.delete(`${this.baseUrl}posts/${id}`, {
                headers: { authorization: `Bearer ${token}` },
            })
        ).data;
    }

    /* COMMENT ENDPOINTS -----------> */

    // POST Comment
    static async createComment(content: string, parentId: string, token: string) {
        return axios.post(
            `${this.baseUrl}posts/comments`,
            { content, parentId },
            { headers: { Authorization: `Bearer ${token}` } },
        );
    }

    /* VOTES ENDPOINTS -----------> */

    // POST Vote
    static async createVote(id: string, token: string) {
        return axios.post(
            `${this.baseUrl}posts/${id}/upvote`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
        );
    }
    // DELETE Vote by ID
    static async deleteVoteById(id: string, token: string) {
        return (
            await axios.delete(`${this.baseUrl}posts/${id}/desupvote`, {
                headers: { authorization: `Bearer ${token}` },
            })
        ).data;
    }
}
