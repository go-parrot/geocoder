import { ValidationError } from 'class-validator';
import { GeocoderException } from './geocoder.exception';

export class ValidationException extends GeocoderException {
    constructor(private readonly errors: ValidationError[]) {
        super('Validation error');
    }

    getValidationErrors(): ValidationError[] {
        return this.errors;
    }
}
