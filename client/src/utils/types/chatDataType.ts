export interface ChatData {
    _id: string;
    participants: string[2];
    participantsIndex: Record<string, "userA" | "userB">;
    participantsPhotos: Record<string, string>;
    participantsNames: Record<string, string>;
}
