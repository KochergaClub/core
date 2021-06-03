import 'react-toggle/style.css';

import React from 'react';
import ReactToggle from 'react-toggle';

import styles from './Toggle.module.css';

export const Toggle: React.FC<React.ComponentProps<typeof ReactToggle>> = (
  props
) => <ReactToggle {...props} className={styles.kch} />;
