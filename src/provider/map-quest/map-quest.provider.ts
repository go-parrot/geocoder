import { AxiosInstance } from 'axios';
import { AbstractHttpProvider } from '../../model';
import { MapQuestGeocodeCommand, MapQuestReverseCommand } from './command';

export class MapQuestProvider extends AbstractHttpProvider {
    constructor(httpClient: AxiosInstance, apiKey: string) {
        super(new MapQuestGeocodeCommand(httpClient, apiKey), new MapQuestReverseCommand(httpClient, apiKey));
    }
}
