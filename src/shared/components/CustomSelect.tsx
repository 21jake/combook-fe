import React from 'react';
import Select from 'react-select';

interface IValue {
  id?: number | string;
  label?: string;
  value?: number | string;
}

interface IGroupOptions {
  label?: string;
  options: Array<any>;
}
interface ICustomSelectProps {
  onChange: Function;
  options: Array<IValue> | Array<IGroupOptions>;
  value?: IValue | Array<IValue> | any;
  defaultValue: IValue | null | Array<IValue>;
  isMulti: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  onBlur?: () => void;
  placeholder?: string;
  isWithinModal?: boolean;
}

export default (props: ICustomSelectProps) => {
  const { onChange, options, value, defaultValue, isMulti, isDisabled, onBlur, isClearable, placeholder, isWithinModal } =
    props;
  // const getValue = (options: Array<IValue>, value: IValue) => {
  //     return options.find((option: IValue) => option.value === value.id);
  // };
  const groupStylesReactSelect = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStylesReactSelect = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal' as 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center' as 'center',
  };
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
    }),
    control: (base: any) => ({
      ...base,
      borderColor: '#e4e7ea',
      '&:hover': {
        borderColor: '#e4e7ea',
      },
      boxShadow: 'none',
      minHeight: 35,
      height: !isMulti && 35,
      backgroundColor: isDisabled ? '#E3E7E9' : '#FFFFFF',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#5c6873',
      padding: '5px',
    }),
  };

  const formatGroupLabelReactSelect = (data: IGroupOptions) => (
    <div style={groupStylesReactSelect}>
      <span>{data.label}</span>
      <span style={groupBadgeStylesReactSelect}>{data.options.length}</span>
    </div>
  );

  const handleFieldTouched = () => {
    onBlur && onBlur();
  };

  return (
    <Select
      onBlur={handleFieldTouched}
      styles={customStyles}
      value={value}
      onChange={(value) => onChange(value)}
      options={options}
      defaultValue={defaultValue}
      formatGroupLabel={formatGroupLabelReactSelect}
      placeholder={placeholder || 'Vui lòng chọn...'}
      isMulti={isMulti}
      isClearable={isClearable === false ? false : true}
      closeMenuOnSelect={!isMulti}
      isDisabled={isDisabled}
      menuPosition={'absolute'}
      menuPortalTarget={!isWithinModal ? document.body : null}
      isRequired={true}
    />
  );
};
