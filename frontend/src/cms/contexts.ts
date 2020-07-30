import React from 'react';

interface WagtailPreviewContextShape {
  preview: boolean;
}

export const WagtailPreviewContext = React.createContext<
  WagtailPreviewContextShape
>({
  preview: false,
});
