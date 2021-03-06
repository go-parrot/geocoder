import type { AxiosInstance } from 'axios';
import { ReverseCommand } from '../../../command';
import type { ReverseQuery } from '../../../model';
import type { MapQuestReverseQueryInterface } from '../interface';
import { MapQuestCommonCommandMixin } from './mixin';

/**
 * @link {https://developer.mapquest.com/documentation/geocoding-api/reverse/get/}
 */
export class MapQuestReverseCommand extends MapQuestCommonCommandMixin(ReverseCommand)<MapQuestReverseQueryInterface> {
    constructor(httpClient: AxiosInstance, private readonly apiKey: string) {
        super(httpClient, apiKey);
    }

    static getUrl(): string {
        return 'https://www.mapquestapi.com/geocoding/v1/reverse';
    }

    protected async buildQuery(query: ReverseQuery): Promise<MapQuestReverseQueryInterface> {
        return {
            key: this.apiKey,
            location: `${query.lat},${query.lon}`,
            thumbMaps: false,
            outFormat: 'json',
        };
    }
}
