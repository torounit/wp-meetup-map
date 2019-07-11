import React, {Fragment, SelectHTMLAttributes, ChangeEvent, Component} from "react"
import classes from "./index.module.css"
import {isEqual} from 'lodash'

export type OptionProp = {
  label: string
  value: string
}

type GroupedOptions = {
  [key: string]: Array<OptionProp>
}

export type OptionsProps = GroupedOptions | Array<OptionProp>

export interface Props extends SelectHTMLAttributes<Element> {
  options: OptionsProps
  label?: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  value?: any
}

const Options: React.FC<{ options: OptionProp[] }> = ({options}) => (
  <Fragment>
    {options.map(({label, value}, i) => (
      <option key={i} label={label} value={value}/>
    ))}
  </Fragment>
)

const OptGroup: React.FC<{ options: GroupedOptions }> = ({options}) => {
  return (
    <Fragment>
      {Object.entries(options).map(([label, children], i) => (
        <optgroup label={label} key={i}>
          <Options options={children}/>
        </optgroup>
      ))}
    </Fragment>
  )
}

const isOptionProps = (options: any): options is OptionProp[] => Array.isArray(options)


class Select extends Component<Props, {}> {

  private readonly selectElement: React.RefObject<HTMLSelectElement>;

  constructor(props: Props) {
    super(props)
    this.selectElement = React.createRef();
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(this.props.options, prevProps.options)) {
      if (this.selectElement.current) {
        this.selectElement.current.value = ''
      }
    }
  }

  render() {
    const {label, className, onChange, options, ...props} = this.props
    return (
      <label className={`${classes.container} ${className}`}>
        <span className={classes.labelText}>{label}</span>
        <select
          ref={this.selectElement}
          {...props}
          className={classes.select}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            if (onChange) {
              onChange(e)
            }
          }}
        >
          {isOptionProps(options) ? <Options options={options}/> : <OptGroup options={options}/>}
        </select>
      </label>)
  }
}

export default Select
