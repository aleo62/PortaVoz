import { generateId } from "@/utils/generateId";
import { UserData } from "@/utils/types/userDataType";
import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateComment(userData: UserData) {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ content, parentId }: { content: string; parentId: string }) =>
            Server.createComment(content, parentId, token!),

        onMutate: async ({ content, parentId }) => {
            // await queryClient.cancelQueries({ queryKey: ["comments", parentId] });
            const previousComments = queryClient.getQueryData(["comments", parentId]);

            console.log(previousComments);
            // queryClient.setQueryData(["comments", parentId], (old) => [
            //     ...(old as any),
            //     {
            //         _id: "tempId" + generateId,
            //         parentId: parentId,
            //         parentType: "Post",
            //         userId: userData?._publicId as string,
            //         userName: userData?.fName as string,
            //         userPhoto: userData?.image as string,
            //         content: content,
            //         upvotesCount: 0,
            //         repliesCount: 0,
            //         replies: [],
            //         createdAt: new Date(),
            //         isUpvoted: false,
            //     },
            // ]);
            // return { previousComments };
        },

        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },

        onSettled: (_data, _err, { parentId }) => {
            queryClient.invalidateQueries({ queryKey: ["comments", parentId] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
