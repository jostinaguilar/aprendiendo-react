import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleAddNewUser = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const form = event.target;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, github, email });
		setResult("ok");
		form.reset();
	};

	return (
		<Card className="mt-10">
			<Title>Create new user</Title>
			<form onSubmit={handleAddNewUser} className="">
				<TextInput name="name" placeholder="name" />
				<TextInput name="email" placeholder="email" />
				<TextInput name="github" placeholder="github" />
				<div>
					<Button type="submit" className="mt-10">
						Save
					</Button>
					{result === "ok" && (
						<Badge className="text-green-800 bg-green-200 rounded-md">
							Succesfull
						</Badge>
					)}
					{result === "ko" && (
						<Badge className="text-red-800 bg-red-200 rounded-md">Error</Badge>
					)}
				</div>
			</form>
		</Card>
	);
}
