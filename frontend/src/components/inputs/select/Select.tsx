import React from "react";
import { Select, Space } from "antd";
import Checkbox from "../checkbox/Checkbox";
import { CustomSelectProps } from "./Select.d";

export default function CustomSelect({
  customStyle,
  children,
  options,
  variant,
  handleChange,
  selected,
}: CustomSelectProps): JSX.Element {
  const { Option } = Select;

  return variant === "multi-select" ? (
    <Select
      style={{
        width: "100%",
        height: "50px",
        ...customStyle,
      }}
      mode="multiple"
      allowClear
    >
      <Option value="china" label="China">
        <Space>
          <span>
            <Checkbox />
          </span>
          China (中国)
        </Space>
      </Option>
    </Select>
  ) : (
    <Select
      style={{
        width: "100%",
        height: "50px",
        ...customStyle,
      }}
      onChange={handleChange}
      value={selected}
      options={
        options || [
          {
            value: "jack",
            label: "Jack",
          },
        ]
      }
    >{children}</Select>
  );
}
