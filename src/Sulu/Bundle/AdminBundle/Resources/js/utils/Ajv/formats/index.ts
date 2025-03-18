import {FormatValidator} from 'ajv';
import idnEmailValidator from './idnEmailValidator';

const formats: {
    [key: string]: typeof FormatValidator
} = {
    'idn-email': idnEmailValidator,
};

export default formats;
