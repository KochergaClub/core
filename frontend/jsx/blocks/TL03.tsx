import React from 'react';

import { Container, TLHeader, TLDescription } from './helpers/index';

interface Props {
  title: string;
  children?: React.ReactNode;
  grey?: boolean;
}

export default function TL03({ title, children, grey }: Props) {
  return (
    <Container grey={grey}>
      <TLHeader size="36px">{title}</TLHeader>
      {children && <TLDescription>{children}</TLDescription>}
    </Container>
  );
}
