import React, { Fragment, SelectHTMLAttributes, ChangeEvent } from "react"
import classes from "../CountrySelect/index.module.css"

type OptionProp = {
  label: string
  value: string
}

type GroupedOptions = {
  [key: string]: Array<OptionProp>
}

export type OptionsProps = GroupedOptions | Array<OptionProp>

interface Props extends SelectHTMLAttributes<Element> {
  options: OptionsProps
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

const isGroupedOptions = (options: any): options is GroupedOptions => typeof options === "object"

const Select: React.FC<Props> = ({ className, value, onChange, options, ...props }) => {
  return (
    <div className={`${classes.container} ${className}`}>
      <select
        {...props}
        value={value}
        className={`${classes.select}`}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          if (onChange) {
            onChange(e)
          }
        }}
      >
        {isGroupedOptions(options) ? <OptGroup options={options} /> : <Options options={options} />}
      </select>
    </div>
  )
}

export default Select
