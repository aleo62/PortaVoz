import { ReportCategoryData } from "@/types/categoryDataType";
import { FiltersType } from "@/types/filtersDataType";
import { RequestPostData } from "@/types/postDataType";
import { ReportData, RequestReportData } from "@/types/reportDataType";
import { UserData } from "@/types/userDataType";
import { api } from ".";

export class Server {
    /* POSTS ENDPOINTS -----------> */

    static async getAllPosts(filters: Partial<FiltersType>, pageParam: number) {
        return (
            await api.get(`/posts`, {
                params: { page: pageParam, ...filters },
            })
        ).data;
    }

    static async getPostById(id: string) {
        return (await api.get(`/posts/${id}`)).data;
    }

    static async getPostsByUser(
        userId: string,
        pageParam: number,
        type: "all" | "posts" | "reposts" = "all",
    ) {
        return (
            await api.get(`/users/${userId}/posts`, {
                params: { page: pageParam, type },
            })
        ).data;
    }

    static async createPost(reportForm: RequestPostData) {
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

        return api.post(`/posts`, formData);
    }

    static async deletePostById(id: string) {
        return await api.delete(`/posts/${id}`);
    }

    /* COMMENT ENDPOINTS -----------> */

    static async getCommentsByParentId(parentId: string, pageParam: number) {
        const res = await api.get(`/posts/${parentId}/comments`, {
            params: { page: pageParam },
        });
        return res.data;
    }

    static async createComment(content: string, parentId: string) {
        return api.post(`/posts/comments`, { content, parentId });
    }

    static async deleteCommentById(id: string) {
        return await api.delete(`/posts/comments/${id}`);
    }

    /* VOTES ENDPOINTS -----------> */

    static async createVote(id: string) {
        return api.post(`/posts/${id}/upvote`, {});
    }

    static async deleteVoteById(id: string) {
        return await api.delete(`/posts/${id}/desupvote`);
    }

    /* USER ENDPOINTS -----------> */

    static async getUserById(userId: string) {
        const res = await api.get(`/users/${userId}`);
        return res.data.user;
    }

    static async getUsers(pageParam: number, name?: string) {
        const res = await api.get(`/users`, {
            params: {
                name: name,
                page: pageParam,
            },
        });
        return res.data;
    }

    static async getRemainingReports(userId: string) {
        const res = await api.get(`/users/${userId}/remaining-reports`);
        return res.data;
    }

    static async createUser(userData: Partial<UserData>) {
        return api.post(`/users/auth`, userData);
    }

    static async updateUser(userData: FormData, userId: string) {
        return (await api.put(`/users/${userId}`, userData)).data;
    }

    static async getUserPreferences(userId: string, field: string) {
        const res = await api.get(`/users/${userId}/preferences/${field}`);
        return res.data.preferences;
    }

    static async updateUserPreferences(userId: string, path: string, value: any) {
        return (await api.put(`/users/${userId}/preferences`, { path, value })).data;
    }

    static async deleteUser(userId: string) {
        return (await api.delete(`/users/${userId}`)).data;
    }

    /* Follow ENDPOINTS -----------> */

    static async getFollowingById(followingId: string) {
        const res = await api.get(`/users/${followingId}/following`);
        return res.data;
    }

    static async createFollow(followingId: string) {
        return api.post(`/users/${followingId}/follow`, {});
    }

    static async deleteFollow(followingId: string) {
        return await api.delete(`/users/${followingId}/unfollow`);
    }

    /* VALIDATOR ENDPOINTS -----------> */

    static async validateStage(reportForm: Partial<RequestPostData>, stage: string) {
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

        return api.post(`/validate/${stage}`, formData);
    }

    /* NOTIFICATIONS ENDPOINTS -----------> */

    static async getNotifications(pageParam: number, userId: string) {
        const res = await api.get(`/users/${userId}/notifications`, {
            params: { page: pageParam },
        });
        return res.data;
    }

    /* CHATS ENDPOINTS -----------> */

    static async getChats(pageParam: number) {
        const res = await api.get(`/chats`, {
            params: { page: pageParam },
        });
        return res.data;
    }

    static async getMessagesByChatId(pageParam: number, chatId: string) {
        const res = await api.get(`/chats/${chatId}/messages`, {
            params: { page: pageParam },
        });
        return res.data;
    }

    static async getChatByUserId(otherUserId: string) {
        const res = await api.post(`/chats/start`, { otherUserId });
        return res.data;
    }

    /* HASHTAGS ENDPOINTS -----------> */

    static async getHashtags(pageParam: number) {
        const res = await api.get(`/hashtags`, {
            params: { page: pageParam },
        });
        return res.data;
    }

    /* REPOST ENDPOINTS -----------> */

    static async createRepost(id: string) {
        return api.post(`/posts/${id}/repost`, {});
    }

    static async deleteRepost(id: string) {
        return await api.delete(`/posts/${id}/repost`);
    }

    /* FAVORITE ENDPOINTS -----------> */

    static async createFavorite(id: string) {
        return api.post(`/posts/${id}/favorite`, {});
    }

    static async deleteFavorite(id: string) {
        return await api.delete(`/posts/${id}/favorite`);
    }

    /* REPORT ENDPOINTS -----------> */

    static async getReportCategories(type?: string) {
        return (
            await api.get(`/reports/categories`, {
                params: { type },
            })
        ).data;
    }

    static async createReportCategory(data: Omit<ReportCategoryData, "_id" | "createdAt">) {
        return (await api.post(`/reports/categories`, data)).data;
    }

    static async updateReportCategory(
        id: string,
        data: Omit<ReportCategoryData, "_id" | "createdAt">,
    ) {
        return (await api.put(`/reports/categories/${id}`, data)).data;
    }

    static async deleteReportCategory(id: string) {
        return (await api.delete(`/reports/categories/${id}`)).data;
    }

    static async createReport(data: RequestReportData) {
        return (await api.post(`/reports`, data)).data;
    }

    static async getReports(pageParam: number) {
        return (
            await api.get(`/reports`, {
                params: { page: pageParam },
            })
        ).data;
    }

    static async updateReport(reportId: string, status: ReportData["status"]) {
        return (await api.put(`/reports/${reportId}`, { status })).data;
    }

    static async deleteReport(reportId: string) {
        return (await api.delete(`/reports/${reportId}`)).data;
    }

    /* Auth ENDPOINTS -----------> */

    // static async sendVerificationCode() {
    //     return (
    //         await api.post(
    //             `/users/code/send`,

    //         )
    //     ).data;
    // }

    // static async verifyVerificationCode(code: string) {
    //     console.log(code);
    //     return (
    //         await api.post(
    //             `/users/code/verify`,
    //             { code },
    //         )
    //     ).data;
    // }
}
