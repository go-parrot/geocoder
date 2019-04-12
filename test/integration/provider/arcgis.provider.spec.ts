import Axios, { AxiosInstance } from 'axios';
import { Geocoder } from '../../../src/geocoder';
import { GeocodeQueryInterface, PlaceDetailsQueryInterface, ReverseQueryInterface, SuggestQueryInterface } from '../../../src/interface';
import { ArcgisProvider } from '../../../src/provider';
import { geocodeQueryFixture, reverseQueryFixture, suggestQueryFixture } from '../../fixture/model/query.fixture';
import { providerParsedPlaceDetailsResponse, providerPlaceDetailsQueryFixture } from '../../fixture/provider/arcgis.fixture';

describe('ArcgisProvider (integration)', () => {
    let client: AxiosInstance;
    let geocoder: Geocoder;
    let geocodeQuery: GeocodeQueryInterface;
    let reverseQuery: ReverseQueryInterface;
    let suggestQuery: SuggestQueryInterface;
    let placeDetailsQuery: PlaceDetailsQueryInterface;

    beforeEach(() => {
        geocodeQuery = { ...geocodeQueryFixture };
        reverseQuery = { ...reverseQueryFixture };
        suggestQuery = { ...suggestQueryFixture };
        placeDetailsQuery = { ...providerPlaceDetailsQueryFixture };

        client = Axios.create();

        const provider: ArcgisProvider = new ArcgisProvider(client);

        geocoder = new Geocoder(provider);
    });

    describe('#geocode', () => {
        it('should return expected response', async () => {
            return geocoder
                .geocode(geocodeQuery)
                .should.eventually.be.an('array')
                .with.length(1);
        });
    });

    describe('#reverse', () => {
        it('should return expected response', async () => {
            return geocoder
                .reverse(reverseQuery)
                .should.eventually.be.an('array')
                .with.length(1);
        });
    });

    describe('#suggest', () => {
        it('should return expected response', async () => {
            return geocoder
                .suggest(suggestQuery)
                .should.eventually.be.an('array')
                .with.length(3);
        });
    });

    describe('#placeDetails', () => {
        it('should return expected response', async () => {
            return geocoder
                .using(ArcgisProvider)
                .placeDetails(placeDetailsQuery)
                .should.become(providerParsedPlaceDetailsResponse);
        });
    });
});
