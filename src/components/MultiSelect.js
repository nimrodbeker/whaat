import 'react-selectize/dist/index.css'
import React from 'react'
import {MultiSelect as MSBase} from 'react-selectize'

const MultiSelect = ({options, values, onValuesChange, placeholder, inputRef}) => {

        values = values === undefined ? undefined : values.map(function (item) {
            return {label: item, value: item}
        });

        options = options === undefined ? undefined : options.map(function (item) {
            return {label: item, value: item}
        });
        return <MSBase
            ref={inputRef}
            options={options}
            defaultValues={values}
            placeholder={placeholder}
            onValuesChange={(newValues)=>{onValuesChange(newValues.map(item => item.value))}}
            theme="material"
            // createFromSearch :: [Item] -> [Item] -> String -> Item?
            createFromSearch={function (options, values, search) {
                const labels = values.map(function (value) {
                    return value.label;
                });
                if (search.trim().length === 0 || labels.indexOf(search.trim()) !== -1)
                    return null;
                return {label: search.trim(), value: search.trim()};
            }}

        />;
    }
;
export default MultiSelect