import React, { useEffect, useState } from 'react';
import useResizeAware from 'react-resize-aware';

import { ItemPageHeader } from '~/blocks/ItemPageHeader';
import { Spinner } from '~/components';

import { MainContext } from '../contexts';
import { Survey } from '../types';
import { AllGroups } from './AllGroups';
import { Intro } from './Intro';
import { Menu } from './Menu';
import { Outro } from './Outro';
import { RightSide } from './RightSide';

export const CensusReport = () => {
  const [resizeListener, sizes] = useResizeAware();

  const [survey, setSurvey] = useState<Survey | undefined>();

  useEffect(() => {
    fetch('/census-data/2021/data.json')
      .then((res) => res.json())
      .then((result) => {
        setSurvey(result);
      });
  }, []);

  const context = {
    rightSideWidth: sizes.width,
    total: survey?.total || null,
  };

  return (
    <div>
      <ItemPageHeader
        title="Итоги переписи русскоговорящих рационалистов-2021"
        sectionTitle="Переписи рационалистов"
        sectionLink="/census"
      />
      <div className="bg-white max-w-5xl mx-auto p-4 min-h-screen">
        <RightSide>
          <div className="relative">{resizeListener}</div>
        </RightSide>
        <MainContext.Provider value={context}>
          <div className="flex justify-center mb-8">
            <Intro />
          </div>
          {survey ? (
            <>
              <Menu survey={survey} />
              <AllGroups survey={survey} />
              <div className="flex justify-center mt-8">
                <Outro survey={survey} />
              </div>
            </>
          ) : (
            <Spinner size="block" />
          )}
        </MainContext.Provider>
      </div>
    </div>
  );
};
