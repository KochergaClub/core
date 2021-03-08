import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { Card } from '~/components/cards';
import { colors, Column, fonts, RichText, Row } from '~/frontkit';

import { RatioTestimonial_CardFragment, RatioTestimonialsDocument } from './queries.generated';

const OuterContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 10px;
  margin-top: 20px;
`;

const AuthorImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`;
const AuthorImagePlaceholder = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: ${colors.grey[300]};
  flex-shrink: 0;
`;

const AuthorName = styled.div`
  font-size: ${fonts.sizes.S};
  font-weight: bold;
`;

const AuthorDescription = styled.div`
  font-size: ${fonts.sizes.XS};
  color: ${colors.grey[700]};
`;

const TestimonialText = styled(RichText)`
  font-size: ${fonts.sizes.S};
`;

const TestimonialCardContents: React.FC<{
  testimonial: RatioTestimonial_CardFragment;
}> = ({ testimonial }) => {
  return (
    <Column gutter={20}>
      <Row gutter={10}>
        {testimonial.author_image && testimonial.author_image_2x ? (
          <AuthorImage
            src={testimonial.author_image.url}
            srcSet={`${testimonial.author_image.url}, ${testimonial.author_image_2x.url} 2x`}
          />
        ) : (
          <AuthorImagePlaceholder />
        )}
        <Column gutter={10}>
          <AuthorName>{testimonial.author_name}</AuthorName>
          <AuthorDescription>
            {testimonial.author_description}
          </AuthorDescription>
        </Column>
      </Row>
      <TestimonialText dangerouslySetInnerHTML={{ __html: testimonial.text }} />
    </Column>
  );
};

export const TestimonialsBlock: React.FC = () => {
  const queryResults = useQuery(RatioTestimonialsDocument);

  return (
    <OuterContainer>
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
    </OuterContainer>
  );
};
