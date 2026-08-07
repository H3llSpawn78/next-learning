import { Suspense } from "react";

// Example serverside API call to fetch random user data
async function fetchPhoneNumber() {
	return await fetch(`https://jsonplaceholder.typicode.com/users/1`)
		.then((res) => res.json())
		.then((data) => data.phone)
		.catch(() => "Error fetching phone number");
}

async function PhoneComponent() {
	const data = await fetchPhoneNumber();
	return <div className="mb-5">{data}</div>;
}

export async function APITest() {
	return (
		<div className="p-4 mb-4 border rounded bg-gray-100">
			<h2>API Test Component</h2>

			<h3>Asynchronous Phone Number</h3>
			<Suspense fallback={<p>Loading phone number...</p>}>
				<PhoneComponent />
			</Suspense>

			<h3>Synchronous Phone Number</h3>
			<PhoneComponent />
		</div>
	);
}
