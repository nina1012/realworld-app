import { ReactNode } from 'react';

export type ConditionalProps = {
  condition: boolean;
  children: ReactNode;
};

export const Conditional = ({
  condition,
  children,
}: ConditionalProps) => {
  return <>{condition && children}</>;
};

Conditional;
