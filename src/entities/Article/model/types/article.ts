import { User } from "entities/User";

export enum ArticleBlockType {
	TEXT = 'TEXT',
	IMAGE = 'IMAGE',
	CODE = 'CODE',
}

export interface ArticleBlockBase {
	id: string;
	type: ArticleBlockType;
}

export interface ArticleTextBlock extends ArticleBlockBase {
	type: ArticleBlockType.TEXT;
	title: string;
	paragraphs: string[];
}

export interface ArticleImageBlock extends ArticleBlockBase {
	type: ArticleBlockType.IMAGE;
	src: string;
	title: string;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
	type: ArticleBlockType.CODE;
	code: string;
}

export type ArticleBlock = ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock;

export enum ArticleType {
	IT = "IT",
	SCIENCE = 'Science',
	ECONOMY = 'Economy',
}

export enum ArticleView {
	BIG = 'BIG',
	SMALL = 'SMALL',
}

export interface Article {
	id: string;
	title: string;
	user: User;
	subtitle: string;
	img: string;
	views: number;
	createdAt: string;
	type: ArticleType[];
	blocks: ArticleBlock[];
}