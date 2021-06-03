import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { Card } from '~/components/cards';
import { Badge, Column, RichText, Row } from '~/frontkit';

import { RatioTestimonial_CardFragment, RatioTestimonialsDocument } from './queries.generated';

const TestimonialCardContents: React.FC<{
  testimonial: RatioTestimonial_CardFragment;
}> = ({ testimonial }) => {
  return (
    <Column gutter={20}>
      <Row gutter={10}>
        {testimonial.author_image && testimonial.author_image_2x ? (
          <img
            className="rounded-full w-16 h-16 flex-shrink-0"
            src={testimonial.author_image.url}
            srcSet={`${testimonial.author_image.url}, ${testimonial.author_image_2x.url} 2x`}
          />
        ) : (
          <div className="rounded-full w-16 h-16 bg-gray-300 flex-shrink-0" />
        )}
        <div>
          <div className="text-sm font-bold">{testimonial.author_name}</div>
          <div className="text-xs text-gray-600">
            {testimonial.author_description}
          </div>
          {testimonial.product ? (
            <a
              className="text-black no-underline"
              href={testimonial.product.link}
            >
              <Badge color={testimonial.product.color}>
                {testimonial.product.title}
              </Badge>
            </a>
          ) : null}
        </div>
      </Row>
      <RichText
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: testimonial.text }}
      />
    </Column>
  );
};

export const TestimonialsBlock: React.FC = () => {
  const queryResults = useQuery(RatioTestimonialsDocument);

  return (
    <div className="mx-auto max-w-7xl p-3 mt-5">
      <ApolloQueryResults {...queryResults}>
        {({ data: { result } }) => (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="10px">
              {result.nodes.map((testimonial) => (
                <Card space="large" key={testimonial.id}>
                  <TestimonialCardContents testimonial={testimonial} />
                </Card>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </ApolloQueryResults>
    </div>
  );
};
