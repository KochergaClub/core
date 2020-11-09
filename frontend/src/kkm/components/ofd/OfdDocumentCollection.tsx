import { parseISO } from 'date-fns';
import React from 'react';
import { FaRegCreditCard, FaRegMoneyBillAlt } from 'react-icons/fa';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, HumanizedDateTime, PaddedBlock, RowWithIcon } from '~/components';
import Card, { CardList } from '~/components/Card';
import HeadlessConnection from '~/components/collections/HeadlessConnection';
import Pager from '~/components/collections/Pager';
import { Row } from '~/frontkit';

import { OfdDocumentsDocument } from './queries.generated';

const OfdFiscalDriveCollection: React.FC = () => {
  const queryResults = useQuery(OfdDocumentsDocument, {
    variables: { first: 20 },
  });

  return (
    <PaddedBlock>
      <h2>Все чеки</h2>
      <ApolloQueryResults {...queryResults}>
        {({ data: { ofdDocuments } }) => (
          <HeadlessConnection
            connection={ofdDocuments}
            fetchPage={queryResults.refetch}
          >
            {({ items, next, previous }) => (
              <div>
                <CardList>
                  {items.map((document) => (
                    <Card key={document.id}>
                      <Row gutter={8}>
                        <small>#{document.id}</small>
                        <small>
                          <HumanizedDateTime
                            date={parseISO(document.created)}
                          />
                        </small>
                      </Row>
                      {document.cash ? (
                        <RowWithIcon
                          icon={FaRegMoneyBillAlt}
                          hint="Наличный платёж"
                        >
                          {document.cash} руб.
                        </RowWithIcon>
                      ) : null}
                      {document.electronic ? (
                        <RowWithIcon
                          icon={FaRegCreditCard}
                          hint="Безналичный платёж"
                        >
                          {document.electronic} руб.
                        </RowWithIcon>
                      ) : null}
                    </Card>
                  ))}
                </CardList>
                <Pager
                  next={next}
                  previous={previous}
                  pageInfo={ofdDocuments.pageInfo}
                />
              </div>
            )}
          </HeadlessConnection>
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default OfdFiscalDriveCollection;
