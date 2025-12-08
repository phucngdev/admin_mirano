import { Col, Row } from 'antd';
import type { ReactNode } from 'react';

interface Props {
  leftSide?: ReactNode;
  rightSide?: ReactNode;
}

export function PageDetailLayout({ leftSide, rightSide }: Props) {
  return (
    <Row className="pb-4" gutter={[{ xl: 16, xs: 0 }, 16]}>
      <Col span={24}>{leftSide}</Col>

      <Col span={24}>{rightSide}</Col>
    </Row>
  );
}
