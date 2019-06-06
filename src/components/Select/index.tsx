import React, { Fragment, SelectHTMLAttributes, ChangeEvent } from "react"
import classes from "./index.module.css"

export type OptionProp = {
  label: string
  value: string
}

type GroupedOptions = {
  [key: string]: Array<OptionProp>
}

export type OptionsProps = GroupedOptions | Array<OptionProp>

interface Props extends SelectHTMLAttributes<Element> {
  options: OptionsProps
  label?: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Options: React.FC<{ options: OptionProp[] }> = ({ options }) => (
  <Fragment>
    {options.map(({ label, value }, i) => (
      <option key={i} label={label} value={value}>
        {label}
      </option>
    ))}
  </Fragment>
)

const OptGroup: React.FC<{ options: GroupedOptions }> = ({ options }) => {
  return (
    <Fragment>
      {Object.entries(options).map(([label, children], i) => (
        <optgroup label={label} key={i}>
          <Options options={children} />
        </optgroup>
      ))}
    </Fragment>
  )
}

const isOptionProps = (options: any): options is OptionProp[] => Array.isArray(options)

const Select: React.FC<Props> = ({ label, className, value, onChange, options, ...props }) => {
  return (
    <label className={`${classes.container} ${className}`}>
      <span className={classes.labelText}>{label}</span>
      <select
        {...props}
        value={value}
        className={classes.select}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          if (onChange) {
            onChange(e)
          }
        }}
      >
        {isOptionProps(options) ? <Options options={options} /> : <OptGroup options={options} />}
      </select>
    </label>
  )
}

export default Select
