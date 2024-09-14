import React from 'react';
import { useFormikContext } from 'formik';

import AppErrorMessage from './AppErrorMessage';
import AppTextInput from '../AppTextInput';

function AppFormField({ name, ...otherprops }) {
    const {setFieldTouched, handleChange, errors, touched}=useFormikContext();

    return (
        <>
            <AppTextInput
                    onBlur={() => setFieldTouched(name)}
                    onChangeText={handleChange(name)}
                    {...otherprops}
                    />
            <AppErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}


export default AppFormField;