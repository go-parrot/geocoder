import type { Constructor } from '../types';
import type { LoggableInterface } from './loggable.interface';
import type { LoggerInterface } from './logger.interface';
import { NullLogger } from './null.logger';

export function LoggableMixin<TBase extends Constructor>(Base: TBase): TBase & Constructor<LoggableInterface> {
    return class extends Base {
        /* tslint:disable:prefer-readonly */
        private logger: LoggerInterface = new NullLogger();

        setLogger(logger: LoggerInterface): this {
            this.logger = logger;

            return this;
        }

        getLogger(): LoggerInterface {
            return this.logger;
        }
    };
}
