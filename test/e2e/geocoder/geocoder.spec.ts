import Axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { InvalidServerResponseException, QuotaExceededException, ValidationException } from '../../../src/exception';
import { Geocoder } from '../../../src/geocoder';
import { GeocodeQueryInterface, ReverseQueryInterface } from '../../../src/interface';
import { AccuracyEnum } from '../../../src/model';
import { GoogleMapsProvider } from '../../../src/provider';
import { plainFullFilledGeocodeQueryObject, plainFullFilledReverseQueryObject } from '../../fixture/model/query.fixture';
import { plainFullFilledResponseObject, plainParsedResponseObject } from '../../fixture/provider/google.fixture';

chai.use(chaiAsPromised);
chai.should();

describe('Geocoder (2e2)', () => {
    let geocodeQueryFixture: GeocodeQueryInterface;
    let reverseQueryFixture: ReverseQueryInterface;
    let geocoder: Geocoder;
    let provider: GoogleMapsProvider;
    let mock: MockAdapter;

    beforeEach(() => {
        geocodeQueryFixture = { ...plainFullFilledGeocodeQueryObject };
        reverseQueryFixture = { ...plainFullFilledReverseQueryObject };

        const client: AxiosInstance = Axios.create();
        mock = new MockAdapter(client);

        provider = new GoogleMapsProvider(client, 'test');

        geocoder = new Geocoder(provider);
    });

    describe('#geocode', () => {
        describe('#filterByAccuracy', () => {
            it('should not use accuracy', async () => {
                mock.onGet(provider.geocodeUrl).reply(200, plainFullFilledResponseObject);

                delete geocodeQueryFixture.accuracy;

                return geocoder.geocode(geocodeQueryFixture).should.become(plainParsedResponseObject);
            });

            it('should filter by AccuracyEnum.COUNTRY', async () => {
                mock.onGet(provider.geocodeUrl).reply(200, plainFullFilledResponseObject);

                geocodeQueryFixture.accuracy = AccuracyEnum.COUNTRY;

                return geocoder.geocode(geocodeQueryFixture).should.become(plainParsedResponseObject);
            });

            it('should filter by AccuracyEnum.STATE', async () => {
                mock.onGet(provider.geocodeUrl).reply(200, plainFullFilledResponseObject);

                geocodeQueryFixture.accuracy = AccuracyEnum.STATE;

                return geocoder.geocode(geocodeQueryFixture).should.become(plainParsedResponseObject);
            });

            it('should filter by AccuracyEnum.CITY', async () => {
                mock.onGet(provider.geocodeUrl).reply(200, plainFullFilledResponseObject);

                geocodeQueryFixture.accuracy = AccuracyEnum.CITY;

                return geocoder.geocode(geocodeQueryFixture).should.become(plainParsedResponseObject);
            });

            it('should filter by AccuracyEnum.STREET_NAME', async () => {
                mock.onGet(provider.geocodeUrl).reply(200, plainFullFilledResponseObject);

                geocodeQueryFixture.accuracy = AccuracyEnum.STREET_NAME;

                return geocoder.geocode(geocodeQueryFixture).should.become(plainParsedResponseObject);
            });

            it('should filter by AccuracyEnum.HOUSE_NUMBER', async () => {
                mock.onGet(provider.geocodeUrl).reply(200, plainFullFilledResponseObject);

                geocodeQueryFixture.accuracy = AccuracyEnum.HOUSE_NUMBER;

                return geocoder.geocode(geocodeQueryFixture).should.become(plainParsedResponseObject);
            });

            it('should throw ValidationException', async () => {
                mock.onGet(provider.geocodeUrl).reply(200, plainFullFilledResponseObject);

                const accuracy: string = `string`;
                geocodeQueryFixture.accuracy = accuracy as AccuracyEnum;

                return geocoder.geocode(geocodeQueryFixture).should.be.rejectedWith(ValidationException, 'Validation error');
            });
        });
    });

    describe('#reverse', () => {
        it('should return success response', async () => {
            mock.onGet(provider.reverseUrl).reply(200, plainFullFilledResponseObject);

            return geocoder.reverse(reverseQueryFixture).should.become(plainParsedResponseObject);
        });

        it('should return InvalidServerResponseException on empty response', async () => {
            mock.onGet(provider.reverseUrl).reply(200, '');

            return geocoder.reverse(reverseQueryFixture).should.be.rejectedWith(InvalidServerResponseException, /Invalid server response/);
        });

        it('should return InvalidServerResponseException', async () => {
            mock.onGet(provider.reverseUrl).reply(200, {
                status: 'REQUEST_DENIED',
                error_message: 'Some other error',
            });

            return geocoder.reverse(reverseQueryFixture).should.be.rejectedWith(InvalidServerResponseException, 'Some other error');
        });

        it('should return QuotaExceededException', async () => {
            mock.onGet(provider.reverseUrl).reply(200, {
                status: 'OVER_QUERY_LIMIT',
            });

            return geocoder.reverse(reverseQueryFixture).should.be.rejectedWith(QuotaExceededException);
        });

        it('should return InvalidServerResponseException', async () => {
            mock.onGet(provider.reverseUrl).reply(500);

            return geocoder.reverse(reverseQueryFixture).should.be.rejectedWith(InvalidServerResponseException);
        });
    });
});
