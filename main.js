/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const axios = require('axios');

class HiveAPI {
    constructor({ apiKey, defaultFormat = 'screenName', host = 'https://hive.one/' } = {}) {
        this.apiKey = apiKey;
        this.defaultFormat = defaultFormat;
        this.host = host;
        if (!this.apiKey) throw new Error('You must provide an API Key');
    }

    async availableInfluncers({ format = this.defaultFormat, etag = '' } = {}) {
        if (!['screenName', 'id'].includes(format)) throw new Error('format not one of: screenName, id');
        try {
            const response = await axios.get(
                `${this.host}api/v1/influencers/`,
                {
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                        'If-None-Match': etag,
                    },
                },
            );

            const data = response.data.data.available.map((item) => item[(format === 'screenName' ? 1 : 0)]);
            data._etag = response.headers.etag;

            return data;
        } catch (error) {
            if (error.response.status === 304) {
                return true;
            }
            throw new Error(error);
        }
    }

    async topInfluencers({
        cluster = 'Crypto', after = 0, sort: sort_by = 'rank', order = 'asc', etag = '',
    } = {}) {
        const sortMap = [
            'followers',
            'following',
            'screen_name',
            'change_week',
            'score',
            'rank',
        ];
        if (!['Crypto', 'BTC', 'ETH', 'XRP'].includes(cluster)) throw new Error('cluster not one of: Crypto, BTC, ETH, XRP');
        if (typeof (after) !== 'number') throw new Error('After should be type int');
        if (!sortMap.includes(sort_by)) throw new Error(`Sort: ${sort_by} is not supported`);
        if (!['asc', 'desc'].includes(order)) throw new Error(`Order: ${order} is not supported`);
        try {
            const response = await axios.get(
                `${this.host}api/v1/influencers/top/`,
                {
                    params: {
                        cluster,
                        after,
                        sort_by,
                        order,
                    },
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                        'If-None-Match': etag,
                    },
                },
            );
            const data = response.data.data.people.edges.map((item) => item.node);
            data._etag = response.headers.etag;
            return data;
        } catch (error) {
            if (error.response.status === 304) {
                return true;
            }
            throw new Error(error);
        }
    }

    async influencerDetails({
        influencerId, format = this.defaultFormat, rankType: rank_type = 'all', includeFollowers: include_followers = 0, etag = '',
    } = {}) {
        if (!influencerId) throw new Error('influencerId not provided');
        if (!['screenName', 'id'].includes(format)) throw new Error('format not one of: screenName, id');
        if (!['all', 'personal'].includes(rank_type)) throw new Error('rankType not one of: all, personal');
        if (![0, 1].includes(include_followers)) throw new Error('includeFollowers not one of: 0, 1');
        try {
            const response = await axios.get(
                `${this.host}api/v1/influencers/${(format === 'screenName' ? 'screen_name' : 'id')}/${influencerId}/`,
                {
                    params: {
                        rank_type,
                        include_followers,
                    },
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                        'If-None-Match': etag,
                    },
                },
            );
            const { data } = response.data;
            data._etag = response.headers.etag;
            return data;
        } catch (error) {
            if (error.response.status === 304) {
                return true;
            }
            throw new Error(error);
        }
    }

    async influencerHistory({
        influencerId, format = this.defaultFormat, rankType: rank_type = 'all',
    } = {}) {
        if (!influencerId) throw new Error('influencerId not provided');
        if (!['screenName', 'id'].includes(format)) throw new Error('format not one of: screenName, id');
        if (!['all', 'personal'].includes(rank_type)) throw new Error('rankType not one of: all, personal');
        try {
            const response = await axios.get(
                `${this.host}api/v1/influencers/${(format === 'screenName' ? 'screen_name' : 'id')}/${influencerId}/history/`,
                {
                    params: {
                        rank_type,
                    },
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                    },
                },
            );
            const { data } = response.data;
            data._etag = response.headers.etag;
            return data;
        } catch (error) {
            if (error.response.status === 304) {
                return true;
            }
            throw new Error(error);
        }
    }

    async influencerPodcasts({
        influencerId, format = this.defaultFormat, appearanceType: appearance_type = 'all', after = 0, etag = '',
    } = {}) {
        if (!influencerId) throw new Error('influencerId not provided');
        if (!['screenName', 'id'].includes(format)) throw new Error('format not one of: screenName, id');
        if (!['all', 'guest', 'host'].includes(appearance_type)) throw new Error('rankType not one of: all, personal');
        if (typeof (after) !== 'number') throw new Error('after should be type int');
        const url = `${this.host}api/v1/influencers/${(format === 'screenName' ? 'screen_name' : 'id')}/${influencerId}/podcasts/`;

        try {
            const response = await axios.get(
                url,
                {
                    params: {
                        appearance_type,
                        after,
                    },
                    headers: {
                        Authorization: `Token ${this.apiKey}`,
                        'If-None-Match': etag,
                    },
                },
            );
            const { data } = response.data;
            data._etag = response.headers.etag;
            return data;
        } catch (error) {
            if (error.response.status === 304) {
                return true;
            }
            throw new Error(error);
        }
    }

    async influencerBatch({
        influencerIDS: twitterIDS = [], rankType: rank_type = 'all', includeFollowers: include_followers = 0,
    } = {}) {
        if (!twitterIDS.length) throw new Error('influencerIDS not provided');
        if (!['all', 'personal'].includes(rank_type)) throw new Error('rankType not one of: all, personal');
        if (![0, 1].includes(include_followers)) throw new Error('includeFollowers not one of: 0, 1');
        try {
            const response = await axios.get(
                `${this.host}api/v1/influencers/batch/`,
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
            if (error.response.status === 304) {
                return true;
            }
            throw new Error(error);
        }
    }
}

function createAPI(settings) {
    return new HiveAPI(settings);
}

export default createAPI;
