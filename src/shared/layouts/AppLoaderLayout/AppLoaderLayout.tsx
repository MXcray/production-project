import { memo } from 'react';
import { MainLayout } from '../MainLayout';
import { HStack, VStack } from '@/shared/ui/redesigned/stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => {
	return (
		<MainLayout
			header={
				<HStack className={cls.header}>
					<Skeleton width={40} height={40} borderRad="50%" />
				</HStack>
			}
			content={
				<VStack gap="16" style={{ height: '100%' }}>
					<Skeleton width="70%" height={32} borderRad="16px" />
					<Skeleton width="40%" height={20} borderRad="16px" />
					<Skeleton width="50%" height={20} borderRad="16px" />
					<Skeleton width="30%" height={32} borderRad="16px" />
					<Skeleton width="80%" height="40%" borderRad="16px" />
					<Skeleton width="80%" height="40%" borderRad="16px" />
				</VStack>
			}
			sidebar={<Skeleton borderRad="32px" width={220} height="100%" />}
		/>
	);
});
