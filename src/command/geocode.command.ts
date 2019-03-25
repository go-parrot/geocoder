import { GeocodeQueryInterface } from '../interface';
import { GeocodeQuery } from '../model';
import { AbstractLocationCommand } from './abstract-location.command';

export class GeocodeCommand<ProviderRequestType = any, ProviderResponseType = any> extends AbstractLocationCommand<
    GeocodeQueryInterface,
    ProviderRequestType,
    ProviderResponseType
> {
    static queryClass(): typeof GeocodeQuery {
        return GeocodeQuery;
    }
}
