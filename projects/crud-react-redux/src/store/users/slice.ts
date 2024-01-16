import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserId = string;

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Peter Doe",
		email: "pet@gmail.com",
		github: "peterdoe",
	},
	{
		id: "2",
		name: "Lena Whitehouse",
		email: "lenawhite@outlook.com",
		github: "lenawhite",
	},
	{
		id: "3",
		name: "Phil Less",
		email: "philless@gmail.com",
		github: "philless",
	},
	{
		id: "4",
		name: "Miguel Angel Duran",
		email: "midudev@yahoo.com",
		github: "midudev",
	},
];

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: string;
}

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux_state__");
	if (persistedState) return JSON.parse(persistedState).users;
	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const userAlredyDefined = state.some(
				(user) => user.id === action.payload.id,
			);

			if (!userAlredyDefined) {
				state.push(action.payload);
			}
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
