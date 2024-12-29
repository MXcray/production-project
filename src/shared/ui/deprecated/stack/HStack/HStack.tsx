import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

// /**
//  * Устарел, новые компоненты в папке redesigned
//  * @deprecated
//  */
export const HStack = (props: HStackProps) => {
	return <Flex direction="row" {...props} />;
};
