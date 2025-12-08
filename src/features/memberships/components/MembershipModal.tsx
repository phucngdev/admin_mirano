import { Modal } from 'antd';
import type { MembershipFormData } from './MembershipForm';
import { MembershipForm } from './MembershipForm';

interface MembershipModalProps {
  title: string;
  open: boolean;
  initialValues?: Partial<MembershipFormData>;
  onOk: (data: MembershipFormData) => void;
  onCancel: () => void;
}

export function MembershipModal({
  title,
  open,
  initialValues,
  onOk,
  onCancel,
}: MembershipModalProps) {
  return (
    <Modal
      footer={null}
      onCancel={onCancel}
      open={open}
      title={title}
      width={800}
    >
      <MembershipForm
        initialValues={initialValues}
        onCancel={onCancel}
        onSubmit={onOk}
      />
    </Modal>
  );
}
