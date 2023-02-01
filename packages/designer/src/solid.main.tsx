import { render } from 'solid-js/web';

import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BAHN, SPK, UKV, VKB, TH } from '@public-oss/kolibri-themes';
import { DEFAULT, BPA, DEFAULT, ITZBund, DEFAULT } from '@public-ui/themes';
import { AppComponent } from './components/app/component.solid';
import { register } from '@public-ui/core';

register([DEFAULT, BPA, DEFAULT, ITZBund, DEFAULT, TH, BAHN, SPK, UKV, VKB, DEFAULT], defineCustomElements, {
	theme: {
		detect: 'auto',
	},
})
	.then(() => {
		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlElement instanceof HTMLElement) {
			render(() => <AppComponent />, htmlElement);
		}
	})
	.catch(console.warn);
