import { useState } from 'react';
import './index.scss';
import QuestionTable from './QuestionTable';
import ModalCreateUpdatePratice from '../../modal/ModalCreateUpdatePractice';
import { QuestionEntity } from '#/api/requests';

const QuestionSet = () => {
  const [openForm, setOpenForm] = useState(false);
  const [itemUpdate, setItemUpdate] = useState<QuestionEntity | null>(null);

  return (
    <>
      <ModalCreateUpdatePratice
        open={openForm}
        onClose={() => setOpenForm(false)}
        questionGroup={null}
        itemUpdate={itemUpdate}
        isHaveAudioAndImage={true}
      />
      <div className="question-set">
        <QuestionTable
          setOpenForm={setOpenForm}
          setItemUpdate={setItemUpdate}
        />
      </div>
    </>
  );
};

export default QuestionSet;
