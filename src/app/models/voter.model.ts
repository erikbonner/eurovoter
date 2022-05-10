import { User } from "@angular/fire/auth";
import { Vote } from "./vote.model";

export class Voter {
    public static fromUser(user: User): Voter {
        return new Voter(
            user.uid,
            user.displayName || user.email || "john/jane doe",
            user.photoURL
        )
    }
    
    constructor(
        public readonly uid: string,
        public readonly name: string,
        public readonly photoUrl: string | null = null,
        public readonly vote: Vote | null = null
    ) {
    }
}