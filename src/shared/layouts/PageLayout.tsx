import { Spin } from 'antd';
import React from 'react';

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
}

export function PageLayout({ header, children, loading = false }: Props) {
  return (
    <div className="h-full">
      <div className="px-6 py-3">{header}</div>
      <div className="p-6 pb-0 border-t border-solid border-neutral-6">
        <Spin spinning={loading}>{children}</Spin>
      </div>
      <div className="h-6" />
    </div>
  );
}
