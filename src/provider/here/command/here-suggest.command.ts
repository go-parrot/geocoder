import { AxiosInstance, AxiosResponse } from 'axios';
import { SuggestCommand } from '../../../command';
import { SuggestionBuilder } from '../../../model';
import { HereProvider } from '../here.provider';
import { HereSuggestQueryInterface } from '../interface';
import { HereLocationCommandMixin } from './mixin';

/**
 * @link {https://developer.here.com/documentation/geocoder/topics/resource-search.html}
 */
export class HereSuggestCommand extends HereLocationCommandMixin(SuggestCommand)<HereSuggestQueryInterface> {
    constructor(httpClient: AxiosInstance, appId: string, appCode: string) {
        // @ts-ignore
        super(httpClient, appId, appCode);
    }

    static getUrl(): string {
        return 'https://geocoder.api.here.com/6.2/search.json';
    }

    protected async parseResponse(response: AxiosResponse): Promise<SuggestionBuilder<HereProvider>[]> {
        if (!response.data.Response || !Array.isArray(response.data.Response.View) || !response.data.Response.View[0]) {
            return [];
        }

        const results: any = response.data.Response.View[0].Result;

        return Promise.all<SuggestionBuilder<HereProvider>>(
            results.map(
                async (raw: any): Promise<SuggestionBuilder<HereProvider>> => {
                    const hereAddress: any = raw.Location.Address || {};

                    const builder: SuggestionBuilder<HereProvider> = new SuggestionBuilder(HereProvider, raw);
                    builder.formattedAddress = hereAddress.Label;

                    return builder;
                },
            ),
        );
    }
}
