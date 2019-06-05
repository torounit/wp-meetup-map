import React, { SelectHTMLAttributes, ChangeEvent } from "react"
import classes from "../CountrySelect/index.module.css"

type OptionProp = {
  label: string
  value: string
}

type GroupedOptions = {
  [key: string]: Array<OptionProp>
}

interface Props extends SelectHTMLAttributes<Element> {
  options: GroupedOptions | Array<OptionProp>
}
const Select: React.FC<Props> = ({ className, value, onChange, options, ...props }) => (
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
    />
  </div>
)

export default Select
