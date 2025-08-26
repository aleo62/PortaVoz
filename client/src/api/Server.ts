import { FiltersType } from "@/utils/types/filtersType";
import { PostData } from "@/utils/types/postDataType";
import axios from "axios";

export class Server {
    // BASE URL
    private static baseUrl = String(import.meta.env.VITE_API_BASEURL);

    /* POSTS ENDPOINTS -----------> */

    // GET all Posts
    static async getAllPosts(token: string, pageParam: number, filters: FiltersType) {
        const res = await axios.get(`${this.baseUrl}posts`, {
            params: { page: pageParam, ...filters },
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

    // POST Post
    static async createPost(reportForm: Partial<PostData>, token: string) {
        const formData = new FormData();
        formData.append("title", reportForm.title!);
        formData.append("desc", reportForm.desc!);
        formData.append("address", reportForm.address!);
        formData.append("location[longitude]", String(reportForm.location?.longitude));
        formData.append("location[latitude]", String(reportForm.location?.latitude));

        if (reportForm.images && reportForm.images.length > 0) {
            reportForm.images.forEach((file) => {
                formData.append(`images`, file);
            });
        }
        if (reportForm.hashtags && reportForm.hashtags.length > 0) {
            reportForm.hashtags.forEach((hashtags) => {
                formData.append(`hashtags`, hashtags);
            });
        }

        return axios.post(`${this.baseUrl}posts`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
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

    // GET all Posts
    static async getCommentsByParentId(token: string, pageParam: number, parentId: string) {
        const res = await axios.get(`${this.baseUrl}posts/${parentId}/comments`, {
            params: { page: pageParam },
            headers: { authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    // POST Comment
    static async createComment(content: string, parentId: string, token: string) {
        return axios.post(
            `${this.baseUrl}posts/comments`,
            { content, parentId },
            { headers: { Authorization: `Bearer ${token}` } },
        );
    }

    // DELETE Comment by ID
    static async deleteCommentById(id: string, token: string) {
        return (
            await axios.delete(`${this.baseUrl}posts/comments/${id}`, {
                headers: { authorization: `Bearer ${token}` },
            })
        ).data;
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

    /* IMAGES ENDPOINTS -----------> */

    // PUT Image
    static async changeImage(newImage: File, token: string) {
        const formData = new FormData();
        formData.append("image", newImage);

        return axios.put(`${this.baseUrl}images`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    /* USER ENDPOINTS -----------> */

    // GET Follow
    static async getFollowingById(token: string, followingId: string) {
        const res = await axios.get(`${this.baseUrl}users/${followingId}/following`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    // POST Comment
    static async createFollow(token: string, followingId: string) {
        return axios.post(
            `${this.baseUrl}users/${followingId}/follow`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
        );
    }

    // DELETE Comment by ID
    static async deleteFollow(token: string, followingId: string) {
        return (
            await axios.delete(`${this.baseUrl}users/${followingId}/unfollow`, {
                headers: { authorization: `Bearer ${token}` },
            })
        ).data;
    }

    // PUT User
    static async reloadUser(token: string) {
        return axios.put(
            `${this.baseUrl}users/update`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
    }

    /* VALIDATOR ENDPOINTS -----------> */
    // POST Validates
    static async validateStage(reportForm: Partial<PostData>, stage: string) {
        const formData = new FormData();
        formData.append("title", reportForm.title!);
        formData.append("desc", reportForm.desc!);

        if (reportForm.images && reportForm.images.length > 0) {
            reportForm.images.forEach((file) => {
                formData.append(`images`, file);
            });
        }
        if (reportForm.hashtags && reportForm.hashtags.length > 0) {
            reportForm.hashtags.forEach((hashtags) => {
                formData.append(`hashtags`, hashtags);
            });
        }

        return axios.post(`${this.baseUrl}validate/${stage}`, formData);
    }

    // GET all Posts
    static async getNotifications(token: string, pageParam: number) {
        const res = await axios.get(`${this.baseUrl}users/notifications`, {
            params: { page: pageParam },
            headers: { authorization: `Bearer ${token}` },
        });
        return res.data;
    }
}
