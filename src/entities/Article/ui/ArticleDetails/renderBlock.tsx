import React from 'react';
import { ArticleBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';

export const renderArticleBlock = (block: ArticleBlock) => {
	switch (block.type) {
		case ArticleBlockType.TEXT:
			return (
				<ArticleTextBlockComponent
					key={block.id}
					className={cls.block}
					block={block}
				/>
			);
		case ArticleBlockType.IMAGE:
			return (
				<ArticleImageBlockComponent
					key={block.id}
					className={cls.block}
					block={block}
				/>
			);
		case ArticleBlockType.CODE:
			return (
				<ArticleCodeBlockComponent
					key={block.id}
					className={cls.block}
					block={block}
				/>
			);
		default:
			return null;
	}
};
