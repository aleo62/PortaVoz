import { FiltersType } from "@/utils/types/filtersDataType";
import { PostData } from "@/utils/types/postDataType";
import { UserData } from "@/utils/types/userDataType";
import axios from "axios";

export class Server {
    // BASE URL
    private static baseUrl = String(import.meta.env.VITE_API_BASEURL);

    /* POSTS ENDPOINTS -----------> */

    // GET all Posts
    static async getAllPosts(token: string, pageParam: number, filters: Partial<FiltersType>) {
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
    static async changeImage(newImage: File, token: string, folder?: string) {
        const formData = new FormData();
        formData.append("image", newImage);
        if (folder) formData.append("folder", folder);

        return axios.put(`${this.baseUrl}images`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    /* USER ENDPOINTS -----------> */

    // GET User
    static async getUserById(userId: string, token: string) {
        const res = await axios.get(`${this.baseUrl}users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.user;
    }

    // GET Users by Name
    static async getUsersByName(name: string, token: string, pageParam: number) {
        const res = await axios.get(`${this.baseUrl}users`, {
            params: { name: name, page: pageParam },
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    // POST User
    static async createUser(userData: Partial<UserData>, token: string) {
        return axios.post(`${this.baseUrl}users/auth`, userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    // PUT User
    static async updateUser(userData: FormData, userId: string, token: string) {
        return (
            await axios.put(`${this.baseUrl}users/${userId}`, userData, {
                headers: { Authorization: `Bearer ${token}` },
            })
        ).data;
    }

    /* Follow ENDPOINTS -----------> */

    // GET Follow
    static async getFollowingById(token: string, followingId: string) {
        const res = await axios.get(`${this.baseUrl}users/${followingId}/following`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    // POST Follow
    static async createFollow(token: string, followingId: string) {
        return axios.post(
            `${this.baseUrl}users/${followingId}/follow`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
        );
    }

    // DELETE Follow
    static async deleteFollow(token: string, followingId: string) {
        return (
            await axios.delete(`${this.baseUrl}users/${followingId}/unfollow`, {
                headers: { authorization: `Bearer ${token}` },
            })
        ).data;
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

    /* NOTIFICATIONS ENDPOINTS -----------> */
    // GET all Notifications
    static async getNotifications(token: string, pageParam: number, userId: string) {
        const res = await axios.get(`${this.baseUrl}users/${userId}/notifications`, {
            params: { page: pageParam },
            headers: { authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    /* CHATS ENDPOINTS -----------> */

    // GET Chats
    static async getChats(token: string, pageParam: number) {
        const res = await axios.get(`${this.baseUrl}chats`, {
            params: { page: pageParam },
            headers: { authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    // GET Messages by chat id
    static async getMessagesByChatId(token: string, pageParam: number, chatId: string) {
        const res = await axios.get(`${this.baseUrl}chats/${chatId}/messages`, {
            params: { page: pageParam },
            headers: { authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    // POST Messages by users id
    static async getChatByUserId(token: string, otherUserId: string) {
        const res = await axios.post(
            `${this.baseUrl}chats/start`,
            { otherUserId },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return res.data;
    }
}
