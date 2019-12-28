import styled from 'styled-components';

const CardBox = styled.div`
  width: 300px;
`;

const Top = styled.div`
  height: 50px;

  border: 1px solid black;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  background-color: black;
  color: white;

  font-size: 36px;
  font-family: 'Intro';
  text-align: center;
  line-height: 50px;
  vertical-align: middle;
`;

const Middle = styled.div`
  height: 89px;

  border-left: 1px solid black;
  border-right: 1px solid black;

  background-color: white;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const MiddleText = styled.div`
  text-align: center;
`;

const Bottom = styled.div`
  height: 50px;

  border: 1px solid black;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  background-color: black;
  color: white;

  font-family: 'Intro';
  font-size: 20px;
  line-height: 50px;
  vertical-align: middle;
  text-align: center;
`;

export default function CustomerCard({ id }: { id: number }) {
  return (
    <CardBox>
      <Top>Кочерга</Top>
      <Middle>
        <img
          src="/static/logo-150.png"
          style={{ height: 60, width: 60, flexShrink: 0 }}
        />
        <MiddleText>Антикафе для всех, кто хочет знать</MiddleText>
      </Middle>
      <Bottom>Клубная карта # {id}</Bottom>
    </CardBox>
  );
}
