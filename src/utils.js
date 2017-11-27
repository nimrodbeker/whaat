import React from 'react'
import {FABButton} from "react-mdl";

const getNumberCompareFunction = (key) =>
    ((a, b) => (a[key] - b[key]));
const getStringCompareFunction = (key) =>
    ((a, b) => {
        a = a[key]//.toUpperCase(); // ignore upper and lowercase
        b = b[key]//.toUpperCase(); // ignore upper and lowercase
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    });

const getObjectValues = (obj) => Object.keys(obj).map((k) => obj[k]);

const Remove = (props) => (<FABButton {...props} mini>X</FABButton>);

export {getObjectValues, getNumberCompareFunction, getStringCompareFunction, Remove}