import { Generic } from '@public-ui/core';
import { Stringified } from '../../types/common';
import { InputTypeOnOff } from '../../types/input/types';
import { watchJsonArrayString, watchString, watchValidator } from '../../utils/prop.validators';
import { InputController } from '../@deprecated/input/controller';
import { Props, Watches } from './types';

export class InputColorController extends InputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string) {
		super(component, name);
		this.component = component;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateAutoComplete(value?: InputTypeOnOff): void {
		watchValidator(
			this.component,
			'_autoComplete',
			(value): boolean => typeof value === 'string' && (value === 'on' || value === 'off'),
			new Set(['on | off']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateList(value?: Stringified<string[]>): void {
		watchJsonArrayString(this.component, '_list', (item: string) => typeof item === 'string', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateValue(value?: string | null): void {
		if (value === null) {
			this.component.state._value = null;
		} else {
			watchString(this.component, '_value', value);
		}
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateList(this.component._list);
		this.validateValue(this.component._value);
	}
}
