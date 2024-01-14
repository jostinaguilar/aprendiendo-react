import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";

const users: { id: string; name: string; email: string; github: string }[] = [
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
];

export function ListOfUsers() {
	return (
		<Card className="rounded-lg border border-gray-200 outline-none ring-0">
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Id</TableHeaderCell>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Email</TableHeaderCell>
						<TableHeaderCell>Actions</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.id}</TableCell>
							<TableCell className="flex flex-row gap-4 items-center">
								<img
									className="h-10 rounded-full"
									src={`https://unavatar.io/github/${item.github}`}
									alt=""
								/>
								{item.name}
							</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
