import Link from 'next/link';
import React from 'react';

import { LabelDiv } from '~/frontkit';
import { projectRoute } from '~/projects/routes';

import { ProjectPage_SummaryFragment } from './fragments.generated';

const ProjectCard = (props: ProjectPage_SummaryFragment) => {
  const url = projectRoute(props.meta.slug);

  return (
    <Link href={url} passHref>
      <a className="no-underline text-black">
        <div className="bg-white h-full group">
          <img
            className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80"
            src={props.image.url}
          />
          <div className="p-5 pt-2">
            <header className="text-xl font-semibold leading-tight">
              {props.title}
            </header>
            {props.activity_summary && props.is_active && (
              <div className="mt-1">
                <LabelDiv>{props.activity_summary}</LabelDiv>
              </div>
            )}
            <div className="mt-2 text-sm text-gray-800 leading-normal">
              {props.summary}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProjectCard;
