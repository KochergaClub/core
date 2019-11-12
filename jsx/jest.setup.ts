import Router from 'next/router';

import { setConfig } from 'next/dist/next-server/lib/runtime-config';
import { publicRuntimeConfig } from './next.config';

setConfig({ publicRuntimeConfig });
