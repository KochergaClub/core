import { BlogPostAuthorFragment } from '../fragments.generated';

export const Author = ({
  name,
  description,
  image,
  image_2x,
}: BlogPostAuthorFragment) => {
  return (
    <div className="flex flex-col items-center w-32 space-y-2 text-center">
      <img
        className="rounded-full mb-2"
        src={image.url}
        srcSet={`${image.url}, ${image_2x.url} 2x`}
      />
      <div className="font-medium leading-tight">{name}</div>
      <div className="text-gray-600 text-xs leading-tight">{description}</div>
    </div>
  );
};
