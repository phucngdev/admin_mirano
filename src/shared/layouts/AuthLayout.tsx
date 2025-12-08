import type { ReactNode } from 'react';
import { Col, Grid, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { WelcomePng } from '#/assets/images';
import { PrimaryLogoIcon } from '#/assets/svg';

interface Props {
  children: ReactNode;
}

function AuthLayout({ children }: Props) {
  const { md } = Grid.useBreakpoint();

  const { t } = useTranslation();
  return (
    <Row className="h-screen max-h-screen w-full">
      {md ? (
        <Col className="h-full" lg={12} md={0} xs={0}>
          <div className="bg-black h-full flex flex-col relative items-center justify-end">
            <img
              alt=""
              className="absolute top-[10%] fill-white"
              src={PrimaryLogoIcon}
            />

            <div className="text-6xl font-bold text-center absolute top-[20%] text-white">
              {t(`login.welcome`)}
            </div>

            <img alt="" className="w-[50vw]" src={WelcomePng} />
          </div>
        </Col>
      ) : null}
      <Col
        className="flex h-full flex-col justify-center items-center rounded-br-lg rounded-tr-lg leading-normal shadow-lg p-6"
        lg={12}
        md={24}
        xs={24}
      >
        {children}
      </Col>
    </Row>
  );
}

export default AuthLayout;
