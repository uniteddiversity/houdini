// License: LGPL-3.0-or-later
import {useState} from "react";
import useCurrentUser, {CurrentUser} from "./useCurrentUser";
import WebUserSignInOut, {SignInError} from '../legacy_react/src/lib/api/sign_in';


interface SetCurrentUser extends ReturnType<typeof useCurrentUser> {
	setCurrentUser(user:CurrentUser):void
}

interface UseCurrentUserAuthReturnType {
	currentUser?: CurrentUser
	submitting: boolean,
	lastError?: SignInError
	signIn: (credentials:{email:string, password:string}) => Promise<CurrentUser>,
	signedIn: boolean
}

export default function useCurrentUserAuth() : UseCurrentUserAuthReturnType {
	const {currentUser, signedIn, setCurrentUser} = useCurrentUser<SetCurrentUser>();
	const [submitting, setSubmitting] = useState(false);
	const [lastError, setLastError] = useState<SignInError|null>(null);

	const [webUserSignInOut] = useState(WebUserSignInOut());

	async function signIn({email, password}:{email:string, password:string}): Promise<CurrentUser> {
		try {
			setSubmitting(true);
			const user = await webUserSignInOut.postLogin({email, password}) as CurrentUser;
			setCurrentUser(user);
			setLastError(null);
			return user;
		}
		catch(e:unknown) {
			const error = e as SignInError;
			setLastError(error);
			throw error;
		}
		finally {
			setSubmitting(false);
		}
	}

	return {
		currentUser,
		submitting,
		lastError,
		signedIn,
		signIn,
	};
}