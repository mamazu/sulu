import type {Element} from 'react';

export type WithContainerSizeElement = Element<any> & {
  containerDidMount?: () => Record<any, any>
};
