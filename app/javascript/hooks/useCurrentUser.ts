// License: LGPL-3.0-or-later
import {useState} from "react";

export interface CurrentUser {
	id: number
}
/**
 * Information about the current user
 */
interface UserCurrentUserReturnType {
	currentUser?: CurrentUser
	signedIn:boolean
}

interface SetUserReturnType extends UserCurrentUserReturnType {
	setCurrentUser(user:CurrentUser): void
}

/**
 * Get information related to the current user.
 *
 * This returns an undocumented hidden setCurrentUser function
 *
 * @export
 * @returns {UserCurrentUserReturnType}
 */
function useCurrentUser<TReturnType extends UserCurrentUserReturnType=UserCurrentUserReturnType>(): TReturnType {
	const[currentUser, setCurrentUser] = useState<CurrentUser|null>(null);
	const output:SetUserReturnType =  {
		currentUser,
		setCurrentUser,
		signedIn: !!currentUser,
	};
	return output as unknown as TReturnType;
}

export default useCurrentUser;