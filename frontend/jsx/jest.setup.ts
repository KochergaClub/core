import { setConfig } from 'next/dist/next-server/lib/runtime-config';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

setConfig({ publicRuntimeConfig });
