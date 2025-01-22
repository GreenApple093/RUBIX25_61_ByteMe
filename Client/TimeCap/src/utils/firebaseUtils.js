import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../firebase";

export const fetchUserName = async () => {
    const user = auth.currentUser; // Get the currently signed-in user

    if (user) {
        const userDoc = await getDoc(doc(database, "users", user.uid));
        console.log(userDoc);
        if (userDoc.exists()) {
            return userDoc.data().name; // Retrieve the user's name
        }
    }
    return "User"; // Fallback name if no name exists
};
