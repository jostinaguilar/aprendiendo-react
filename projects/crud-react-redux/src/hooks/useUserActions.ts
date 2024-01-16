import { User, UserId, addNewUser, deleteUserById } from "../store/users/slice";
import { useAppDispatch } from "./store";

export function useUserActions() {
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const deleteUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { addUser, deleteUser };
}
