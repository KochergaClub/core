import { setConfig } from 'next/dist/next-server/lib/runtime-config';
import { publicRuntimeConfig } from './next.raw-config';

setConfig({ publicRuntimeConfig });
