/* eslint-disable no-underscore-dangle */
const dotenv = require('dotenv');

dotenv.config();

const hive = require('./dist/hive').default;

const hiveAPI = hive({ apiKey: process.env.APIKEY });

// Two types of test, unit tests with mocking and integrations tests using live API

test('API Key returns same API Key in env', () => {
    expect(hiveAPI.apiKey).toBe(process.env.APIKEY);
});

describe('Change Defaults', () => {
    test('Change format', () => {
        const testAPI = hive({ apiKey: process.env.APIKEY, defaultFormat: 'id' });
        expect(testAPI.defaultFormat).toBe('id');
    });

    test('Change Host', () => {
        const testAPI = hive({ apiKey: process.env.APIKEY, host: 'https://test.com' });
        expect(testAPI.host).toBe('https://test.com');
    });
});

describe('Integration Tests With Live API', () => {
    describe('Available Influencers', () => {
        test('Default params', async () => {
            const response = await hiveAPI.availableInfluncers();
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('string');
        });

        test('screenName format', async () => {
            const response = await hiveAPI.availableInfluncers({ format: 'screenName' });
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('string');
        });

        test('Id format', async () => {
            const response = await hiveAPI.availableInfluncers({ format: 'id' });
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('string');
            expect(typeof (parseInt(response[0], 10))).toBe('number');
        });

        test('Nonsense Format', async () => {
            await expect(hiveAPI.availableInfluncers({ format: 'nonsense' }))
                .rejects
                .toThrow(Error);
        });

        test('Etag', async () => {
            const response = await hiveAPI.availableInfluncers({ format: 'id' });
            const etagResponse = await hiveAPI.availableInfluncers({ format: 'id', etag: response._etag });
            expect(etagResponse).toBe(true);
            expect(typeof (etagResponse)).toBe('boolean');
        });
    });

    describe('Top Influencers', () => {
        test('Default params', async () => {
            const response = await hiveAPI.topInfluencers();
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('object');
        });

        test('Crypto', async () => {
            const response = await hiveAPI.topInfluencers({ cluster: 'Crypto' });
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('object');
        });

        test('BTC', async () => {
            const response = await hiveAPI.topInfluencers({ cluster: 'BTC' });
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('object');
        });

        test('ETH', async () => {
            const response = await hiveAPI.topInfluencers({ cluster: 'ETH' });
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('object');
        });

        test('XRP', async () => {
            const response = await hiveAPI.topInfluencers({ cluster: 'XRP' });
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('object');
        });

        test('Paginate', async () => {
            const response = await hiveAPI.topInfluencers({ after: 100 });
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('object');
        });

        test('Incorrect Cluster', async () => {
            await expect(hiveAPI.topInfluencers({ cluster: 'ECoin' }))
                .rejects
                .toThrow(Error);
        });

        test('Change Sort', async () => {
            const response = await hiveAPI.topInfluencers({ sort: 'change_week', order: 'desc' });
            const firstRank = response[0].rank;
            const secondRank = response[1].rank;
            expect(secondRank).not.toBe(firstRank + 1);
        });

        test('Etag', async () => {
            const response = await hiveAPI.topInfluencers({ sort: 'change_week', order: 'desc' });
            const etagResponse = await hiveAPI.topInfluencers({ sort: 'change_week', order: 'desc', etag: response._etag });
            expect(etagResponse).toBe(true);
            expect(typeof (etagResponse)).toBe('boolean');
        });
    });

    describe('Influencer Details', () => {
        test('Nothing Passed', async () => {
            await expect(hiveAPI.influencerDetails())
                .rejects
                .toThrow(Error);
        });

        test('Default Params', async () => {
            const response = await hiveAPI.influencerDetails({ influencerId: 'aantonop' });
            expect(typeof (response)).toBe('object');
            expect(response.screenName).toBe('aantonop');
        });

        test('Rank Type', async () => {
            const response = await hiveAPI.influencerDetails({ influencerId: 'aantonop', rankType: 'personal' });
            expect(typeof (response)).toBe('object');
            expect(response.screenName).toBe('aantonop');
        });

        test('Include Followers', async () => {
            const response = await hiveAPI.influencerDetails({ influencerId: 'aantonop', includeFollowers: 1 });
            expect(typeof (response)).toBe('object');
            expect(response.screenName).toBe('aantonop');
            expect(Object.prototype.hasOwnProperty.call(response.scores[0], 'followers')).toBe(true);
        });

        test('Unsupported Rank Type', async () => {
            await expect(hiveAPI.influencerDetails({ influencerId: 'aantonop', rankType: 'biz' }))
                .rejects
                .toThrow(Error);
        });

        test('Unsupported Followers - Int', async () => {
            await expect(hiveAPI.influencerDetails({ influencerId: 'aantonop', includeFollowers: 3 }))
                .rejects
                .toThrow(Error);
        });

        test('Unsupported Followers - String', async () => {
            await expect(hiveAPI.influencerDetails({ influencerId: 'aantonop', includeFollowers: '0' }))
                .rejects
                .toThrow(Error);
        });

        test('Etag', async () => {
            const response = await hiveAPI.influencerDetails({ influencerId: 'aantonop', includeFollowers: 1 });
            const etagResponse = await hiveAPI.influencerDetails({ influencerId: 'aantonop', includeFollowers: 1, etag: response._etag });
            expect(etagResponse).toBe(true);
            expect(typeof (etagResponse)).toBe('boolean');
        });

        // TODO: Screen Name
        // TODO: ID
    });

    describe('Influencer Podcasts', () => {
        test('Nothing Passed', async () => {
            await expect(hiveAPI.influencerPodcasts())
                .rejects
                .toThrow(Error);
        });

        test('Default Params', async () => {
            const response = await hiveAPI.influencerPodcasts({ influencerId: 'laurashin' });
            expect(typeof (response)).toBe('object');
            expect(response.screenName).toBe('laurashin');
            expect(Object.prototype.hasOwnProperty.call(response, 'podcasts')).toBe(true);
        });

        test('Appearance Type', async () => {
            const response = await hiveAPI.influencerPodcasts({ influencerId: 'laurashin', appearanceType: 'guest' });
            expect(typeof (response)).toBe('object');
            expect(response.screenName).toBe('laurashin');
            expect(Object.prototype.hasOwnProperty.call(response, 'podcasts')).toBe(true);
        });

        test('After', async () => {
            const response = await hiveAPI.influencerPodcasts({ influencerId: 'laurashin', after: 20 });
            expect(typeof (response)).toBe('object');
            expect(response.screenName).toBe('laurashin');
            expect(Object.prototype.hasOwnProperty.call(response, 'podcasts')).toBe(true);
        });

        test('Unsupported Appearance Type', async () => {
            await expect(hiveAPI.influencerPodcasts({ influencerId: 'laurashin', appearanceType: 'audience' }))
                .rejects
                .toThrow(Error);
        });

        test('Unsupported After Type', async () => {
            await expect(hiveAPI.influencerPodcasts({ influencerId: 'laurashin', after: '20' }))
                .rejects
                .toThrow(Error);
        });

        test('Etag', async () => {
            const response = await hiveAPI.influencerPodcasts({ influencerId: 'laurashin', appearanceType: 'guest' });
            const etagResponse = await hiveAPI.influencerPodcasts({ influencerId: 'laurashin', appearanceType: 'guest', etag: response._etag });
            expect(etagResponse).toBe(true);
            expect(typeof (etagResponse)).toBe('boolean');
        });
    });

    describe('Influencer Batch', () => {
        test('Nothing Passed', async () => {
            await expect(hiveAPI.influencerBatch())
                .rejects
                .toThrow(Error);
        });

        test('Default Params', async () => {
            const response = await hiveAPI.influencerBatch({ influencerIDS: [12, 34] });
            expect(typeof (response)).toBe('object');
        });

        test('Rank Type', async () => {
            const response = await hiveAPI.influencerBatch({ influencerIDS: [12, 34], rankType: 'personal' });
            expect(typeof (response)).toBe('object');
        });

        test('Include Followers', async () => {
            jest.setTimeout(30000);
            const response = await hiveAPI.influencerBatch(
                { influencerIDS: [12, 34], includeFollowers: 1 },
            );
            expect(typeof (response)).toBe('object');
        });

        test('Unsupported Rank Type', async () => {
            await expect(hiveAPI.influencerBatch({ influencerIDS: [12, 34], rankType: 'biz' }))
                .rejects
                .toThrow(Error);
        });

        test('Unsupported Followers - Int', async () => {
            await expect(hiveAPI.influencerBatch({ influencerIDS: [12, 34], includeFollowers: 2 }))
                .rejects
                .toThrow(Error);
        });

        test('Unsupported Followers - String', async () => {
            await expect(hiveAPI.influencerBatch({ influencerIDS: [12, 34], includeFollowers: '1' }))
                .rejects
                .toThrow(Error);
        });
    });
});
