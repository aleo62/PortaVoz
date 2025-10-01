import { UserData } from "@/utils/types/userDataType";
import { Server } from "@api/Server";

export async function createUserService(userData: Partial<UserData>, token: string) {
    return Server.createUser(userData, token);
}
