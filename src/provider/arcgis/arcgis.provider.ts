import { AxiosInstance } from 'axios';
import { AbstractHttpProvider } from '../../model';
import { ArcgisGeocodeCommand, ArcgisReverseCommand, ArcgisSuggestCommand } from './command';

export class ArcgisProvider extends AbstractHttpProvider {
    constructor(httpClient: AxiosInstance, token?: string) {
        super(new ArcgisGeocodeCommand(httpClient, token), new ArcgisReverseCommand(httpClient, token), new ArcgisSuggestCommand(httpClient, token));
    }
}
