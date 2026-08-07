export type User = {
	id: string;
	firstName: string;
	lastName: string;
};

export type OrchestrationResponse<T> = {
	result: T;
	statusCode: string;
	message?: string;
};
