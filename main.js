const axios = require('axios');

class HiveAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        if (!this.apiKey) throw new Error('You must provide an API Key');
    }

    async availableInfluncers({ format = 'screenName' } = {}) {
        try {
            const response = await axios.get(
                'https://hive.one/api/v1/influencers/',
                {
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                    },
                },
            );
            return response.data.data.available.map((item) => item[(format === 'screenName' ? 1 : 0)]);
        } catch (error) {
            throw new Error(error);
        }
    }

    async topInfluencers({ cluster = 'Crypto', after = 0 } = {}) {
        try {
            const response = await axios.get(
                'https://hive.one/api/v1/influencers/top/',
                {
                    params: {
                        cluster,
                        after,
                    },
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                    },
                },
            );
            return response.data.data.people.edges.map((item) => item.node);
        } catch (error) {
            throw new Error(error);
        }
    }

    async influencerDetails({
        influencerId, format = 'screenName', rankType: rank_type = 'all', includeFollowers: include_followers = 0,
    } = {}) {
        if (!influencerId) throw new Error('influencerId not provided');
        if (!['all', 'personal'].includes(rank_type)) throw new Error('rankType not one of: all, personal');
        if (![0, 1].includes(include_followers)) throw new Error('includeFollowers not one of: 0, 1');
        try {
            const response = await axios.get(
                `https://hive.one/api/v1/influencers/${(format === 'screenName' ? 'screen_name' : 'id')}/${influencerId}/`,
                {
                    params: {
                        rank_type,
                        include_followers,
                    },
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                    },
                },
            );
            return response.data.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async influencerHistory({ influencerId, format = 'screenName', rankType: rank_type = 'all' } = {}) {
        try {
            const response = await axios.get(
                `https://hive.one/api/v1/influencers/${(format === 'screenName' ? 'screen_name' : 'id')}/${influencerId}/history/`,
                {
                    params: {
                        rank_type,
                    },
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                    },
                },
            );
            return response.data.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async influencerPodcasts({
        influencerId, format = 'screenName', appearanceType: appearance_type = 'all', after = 0,
    } = {}) {
        if (!influencerId) throw new Error('influencerId not provided');
        if (!['all', 'guest', 'host'].includes(appearance_type)) throw new Error('rankType not one of: all, personal');
        if (typeof (after) !== 'number') throw new Error('After should be type int');
        try {
            const response = await axios.get(
                `https://hive.one/api/v1/influencers/${(format === 'screenName' ? 'screen_name' : 'id')}/${influencerId}/podcasts/`,
                {
                    params: {
                        appearance_type,
                        after,
                    },
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                    },
                },
            );
            return response.data.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async influencerBatch({ influencerIDS: twitterIDS = [], rankType: rank_type = 'all', includeFollowers: include_followers = 0 } = {}) {
        if (!twitterIDS.length) throw new Error('influencerIDS not provided');
        if (!['all', 'personal'].includes(rank_type)) throw new Error('rankType not one of: all, personal');
        if (![0, 1].includes(include_followers)) throw new Error('includeFollowers not one of: 0, 1');
        try {
            const response = await axios.get(
                'https://hive.one/api/v1/influencers/batch/',
                {
                    params: {
                        twitter_ids: JSON.stringify(twitterIDS),
                        rank_type,
                        include_followers,
                    },
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                    },
                },
            );
            return response.data.data.success;
        } catch (error) {
            throw new Error(error);
        }
    }
}

function createAPI(key) {
    return new HiveAPI(key);
}

export default createAPI;
