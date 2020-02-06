const dotenv = require('dotenv');

dotenv.config();

const hive = require('./dist/hive').default;

const hiveAPI = hive(process.env.APIKEY);

// Two types of test, unit tests with mocking and integrations tests using live API

test('API Key returns same API Key in env', () => {
    expect(hiveAPI.apiKey).toBe(process.env.APIKEY);
});

describe('Integration Tests With Live API', () => {
    describe('Available Influencers', () => {
        test('Default params', async () => {
            const response = await hiveAPI.availableInfluncers();
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('string');
        });

        test('screenName format', async () => {
            const response = await hiveAPI.availableInfluncers({ format: 'screeName' });
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
            const response = await hiveAPI.availableInfluncers({ format: 'nonsense' });
            expect(typeof (response)).toBe('object');
            expect(typeof (response[0])).toBe('string');
            expect(typeof (parseInt(response[0], 10))).toBe('number');
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
            const response = await hiveAPI.influencerPodcasts({ influencerId: 'aantonop' });
            expect(typeof (response)).toBe('object');
            expect(response.screenName).toBe('aantonop');
            expect(Object.prototype.hasOwnProperty.call(response, 'podcasts')).toBe(true);
        });

        test('Appearance Type', async () => {
            const response = await hiveAPI.influencerPodcasts({ influencerId: 'aantonop', appearanceType: 'guest' });
            expect(typeof (response)).toBe('object');
            expect(response.screenName).toBe('aantonop');
            expect(Object.prototype.hasOwnProperty.call(response, 'podcasts')).toBe(true);
        });

        test('After', async () => {
            const response = await hiveAPI.influencerPodcasts({ influencerId: 'aantonop', after: 20 });
            expect(typeof (response)).toBe('object');
            expect(response.screenName).toBe('aantonop');
            expect(Object.prototype.hasOwnProperty.call(response, 'podcasts')).toBe(true);
        });

        test('Unsupported Appearance Type', async () => {
            await expect(hiveAPI.influencerPodcasts({ influencerId: 'aantonop', appearanceType: 'audience' }))
                .rejects
                .toThrow(Error);
        });

        test('Unsupported After Type', async () => {
            await expect(hiveAPI.influencerPodcasts({ influencerId: 'aantonop', after: '20' }))
                .rejects
                .toThrow(Error);
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
