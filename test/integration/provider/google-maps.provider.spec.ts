import Axios, { AxiosInstance } from 'axios';
import { Geocoder } from '../../../src/geocoder';
import { GeocodeQueryInterface, PlaceDetailsQueryInterface, ReverseQueryInterface, SuggestQueryInterface } from '../../../src/interface';
import { Location } from '../../../src/model';
import { GoogleMapsProvider } from '../../../src/provider';
import {
    geocodeQueryFixture,
    geocodeQueryFixtureForAustralia,
    geocodeQueryFixtureForCountryWithoutStateCode,
    reverseQueryFixture,
    suggestQueryFixture,
} from '../../fixture/model/query.fixture';
import { providerParsedPlaceDetailsResponse, providerPlaceDetailsQueryFixture } from '../../fixture/provider/google.fixture';

describe('GoogleMapsProvider (integration)', () => {
    let client: AxiosInstance;
    let geocoder: Geocoder;
    let geocodeQuery: GeocodeQueryInterface;
    let geocodeQueryForAustralia: GeocodeQueryInterface;
    let geocodeQueryForCountryWithoutStateCode: GeocodeQueryInterface;
    let reverseQuery: ReverseQueryInterface;
    let suggestQuery: SuggestQueryInterface;
    let placeDetailsQuery: PlaceDetailsQueryInterface;

    beforeEach(() => {
        geocodeQuery = { ...geocodeQueryFixture };
        reverseQuery = { ...reverseQueryFixture };
        suggestQuery = { ...suggestQueryFixture };
        suggestQuery = { ...suggestQueryFixture };
        geocodeQueryForAustralia = { ...geocodeQueryFixtureForAustralia };
        geocodeQueryForCountryWithoutStateCode = { ...geocodeQueryFixtureForCountryWithoutStateCode };

        placeDetailsQuery = { ...providerPlaceDetailsQueryFixture };

        client = Axios.create();

        const provider: GoogleMapsProvider = new GoogleMapsProvider(client, `${process.env.GOOGLE_MAPS_API_KEY}`);

        geocoder = new Geocoder(provider);
    });

    describe('#geocode', () => {
        it('should return expected response', async () => {
            return geocoder.geocode(geocodeQuery).should.eventually.be.an('array').with.length(1);
        });

        it('should return expected response for Australia address', async () => {
            return geocoder.geocode(geocodeQueryForAustralia).should.eventually.be.an('array').with.length(1);
        });

        it('should return expected response for country without stateCode', async () => {
            return geocoder.geocode(geocodeQueryForCountryWithoutStateCode).should.eventually.be.an('array').with.length(1);
        });
    });

    describe('#reverse', () => {
        it('should return expected response', async () => {
            return geocoder.reverse(reverseQuery).should.eventually.be.an('array').with.length(3);
        });
    });

    describe('#suggest', () => {
        it('should return expected response', async () => {
            return geocoder.suggest(suggestQuery).should.eventually.be.an('array').with.length(1);
        });
    });

    describe('#placeDetails', () => {
        it('should return expected response', async () => {
            const location: Location = await geocoder.using(GoogleMapsProvider).placeDetails(placeDetailsQuery);

            // sometimes this field is not returned
            delete location.raw.id;
            delete location.raw.scope;

            return location.should.be.deep.eq(providerParsedPlaceDetailsResponse);
        });
    });
});
