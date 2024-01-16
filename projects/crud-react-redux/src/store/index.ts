import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux_state__", JSON.stringify(store.getState()));
	};

const syncWithDataMiddleware: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;

	const previousState = store.getState();

	next(action);

	if (type === "users/deleteUserById") {
		const userToRemove = previousState.users.find(
			(user) => user.id === payload,
		);

		fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					return toast.success("User delete successfull");
				}

				throw new Error("Error to deleting user");
			})
			.catch((err) => {
				toast.error("Error to deleting user");
				if (userToRemove) {
					store.dispatch(rollbackUser(userToRemove));
				}
			});
	}
};

export const store = configureStore({
	reducer: { users: usersReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			persistanceLocalStorageMiddleware,
			syncWithDataMiddleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
