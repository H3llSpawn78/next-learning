export type Maybe<T> = T | null;

export type Image = {
	url: string;
	width: number;
	height: number;
	altText: string;
};

export type Page = {
	id: string;
	title: string;
	handle: string;
	body: any; // TODO: Update this with correct umbraco blockgrid type when known
	seo: SEO;
	contentType: string;
	excludeFromSearch: boolean;
	excludeFromSitemap: boolean;
	properties: { [id: string]: any };
	createdAt: string;
	updatedAt: string;
};

export type SEO = {
	title: string;
	description: string;
};

export type CodeRef = {
	code: string;
	name: string;
};

export type AliasRef = {
	alias: string;
	name: string;
};

// ======================================
// Umbraco
// ======================================

export type UmbracoElement = {
	id: string;
	contentType: string;
	properties: { [id: string]: any };
};

export type UmbracoNode = UmbracoElement & {
	name: string;
	route: UmbracoRoute;
	createDate: string;
	updateDate: string;
};

export type UmbracoMedia = {
	id: string;
	name: string;
	mediaType: string;
	url: string;
	extension: string;
	width: number;
	height: number;
	bytes: null;
	properties: { [id: string]: any };
};

export type UmbracoRoute = {
	path: string;
	startItem: UmbracoStartItem;
};

export type UmbracoStartItem = {
	id: string;
	path: string;
};

export type UmbracoPagedResult<T> = {
	total: number;
	items: T[];
};

export type UmbracoLink = {
	url: string;
	title: string;
	target?: string;
	destinationId?: string;
	destinationType?: string;
	route?: UmbracoRoute;
	linkType: string;
};
