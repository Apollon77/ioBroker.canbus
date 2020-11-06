import * as React from 'react';

import {
  Grid,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { uuidv4 } from '../lib/helpers';

interface InputCheckboxProps {
  onChange: (newValue: boolean) => void;

  /**
   * Unique ID for this element.
   * If not set a UUID will be generated.
   */
  id?: string;

  /**
   * Label for this input.
   */
  label: string;

  /**
   * The value of the input.
   */
  value: boolean;

  /**
   * If the input element should be completeley disabled.
   */
  disabled?: boolean;
}

interface InputCheckboxState {
  id: string;
  value: boolean;
}

/**
 * A single checkbox input.
 */
export class InputCheckbox extends React.PureComponent<Partial<Record<Breakpoint, boolean | GridSize>> & InputCheckboxProps, InputCheckboxState> {

  constructor(props: InputCheckboxProps) {
    super(props);

    this.state = {
      id: this.props.id || uuidv4(),
      value: this.props.value
    };
  }

  public componentDidUpdate (prevProps: InputCheckboxProps): void {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      });
    }
  }

  public render(): JSX.Element {
    return (
      <Grid item xs={this.props.xs} sm={this.props.sm} md={this.props.md} lg={this.props.lg} xl={this.props.xl}>
        <FormControl>
          <FormControlLabel
            control={<Checkbox checked={this.state.value} onChange={(e) => this.handleChange(e.target.checked)} />}
            label={this.props.label}
          />

          {this.props.children && <FormHelperText>{this.props.children}</FormHelperText>}
        </FormControl>
      </Grid>
    );
  }

  private handleChange (checked: boolean): void {
    this.setState({
      value: checked
    }, () => {
      this.props.onChange(this.state.value);
    });
  }
}