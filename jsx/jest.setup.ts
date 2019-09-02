import Router from 'next/router';

import { setConfig } from 'next-server/dist/lib/runtime-config';
import { publicRuntimeConfig } from './next.config';

setConfig({ publicRuntimeConfig });
