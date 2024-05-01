import React, { type ReactNode } from 'react';

interface ConditionalProps {
  condition: boolean;
  children: ReactNode;
}

export function Conditional({ condition, children }: ConditionalProps) {
  const childComponents = React.Children.toArray(children);

  if (condition) {
    const ifComponent = childComponents.find(
      (child: any) => child.type === Conditional.If
    );
    return (ifComponent as React.ReactElement) || <></>;
  } else {
    const elseComponent = childComponents.find(
      (child: any) => child.type === Conditional.Else
    );
    return (elseComponent as React.ReactElement) || <></>;
  }
}

function If({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function Else({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

Conditional.If = If;
Conditional.Else = Else;
