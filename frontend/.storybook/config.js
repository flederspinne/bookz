import { configure } from '@storybook/react';

// automatically import all files ending in *.common.js
configure(require.context('../src/common', true, /\.stories\.js$/), module);
