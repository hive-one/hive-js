const axios = require('axios');

class HiveAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        if (!this.apiKey) throw new Error('You must provide an API Key');
    }

    async availableInfluncers({format = 'screenName'} = {}) {
        try {
            let response = await axios.get('https://hive.one/api/v1/influencers/');
            return response.data.data.available.map(item => item[(format == 'screenName' ? 1 : 0)]);
        } catch (error) {
            throw new Error(error)
        }
    }

    async topInfluencers({cluster = 'Crypto', after = 0} = {}) {
        try {
            let response = await axios.get(
                'https://hive.one/api/v1/influencers/top/',
                {
                    params: {
                        cluster,
                        after
                    }
                }
            );
            return response.data.data.people.edges.map(item => item.node);
        } catch (error) {
            throw new Error(error)
        }
    }

    async influencerDetails({influencerId, format = 'screenName', rankType: rank_type = 'all', includeFollowers: include_followers = 0} = {}) {
        try {
            let response = await axios.get(
                `https://hive.one/api/v1/influencers/${(format === 'screenName' ? 'screen_name' : 'id')}/${influencerId}/`,
                {
                    params: {
                        rank_type,
                        include_followers
                    }
                }
            );
            return response.data.data;
        } catch (error) {
            throw new Error(error)
        }
    }

    async influencerHistory({influencerId, format = 'screenName', rankType: rank_type = 'all'} = {}) {
        try {
            let response = await axios.get(
                `https://hive.one/api/v1/influencers/${(format === 'screenName' ? 'screen_name' : 'id')}/${influencerId}/history/`,
                {
                    params: {
                        rank_type,
                    }
                }
            );
            return response.data.data;
        } catch (error) {
            throw new Error(error)
        }
    }

    async influencerPodcasts({influencerId, format = 'screenName', appearanceType: appearance_type = 'all', after = 0} = {}) {
        try {
            let response = await axios.get(
                `https://hive.one/api/v1/influencers/${(format === 'screenName' ? 'screen_name' : 'id')}/${influencerId}/podcasts/`,
                {
                    params: {
                        appearance_type,
                        after
                    }
                }
            );
            return response.data.data;
        } catch (error) {
            throw new Error(error)
        }
    }

    async influencerBatch({influencerIDS: twitter_ids = [], rankType: rank_type = 'all', includeFollowers: include_followers = 0} = {}) {
        try {
            let response = await axios.get(
                `https://hive.one/api/v1/influencers/batch/`,
                {
                    params: {
                        twitter_ids: JSON.stringify(twitter_ids),
                        rank_type,
                        include_followers,
                    }
                }
            );
            return response.data.data.success;
        } catch (error) {
            throw new Error(error)
        }
    }
}

function createAPI(key) {
    return new HiveAPI(key);
}

export default createAPI