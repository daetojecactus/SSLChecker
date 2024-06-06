import React, { ReactNode } from 'react';
import { Row, Col } from 'antd';

interface ContainerProps {
  children: ReactNode;
}

export default function Container ({ children }: ContainerProps) {
  return (
    <div className='container'>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

