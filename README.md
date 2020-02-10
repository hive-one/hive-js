![Test Suite](https://github.com/hive-one/hive-js/workflows/Test%20Suite/badge.svg?branch=master)

# Hive JS


## Install

1. Sign up for an Account at [hive.one](https://hive.one/)
2. Get an API Key [here](https://hive.one/api/)
3. Install via `npm`
```
npm install --save hiveone-js
```


## Usage
Import into your project using the relevant method:
```
const hive = require('hiveone-js').default;
const api = hive({ apiKey: 'APIKEYHERE' });
```

```
import hive from 'hiveone-js';
const api = hive({ apiKey: 'APIKEYHERE' });
```

### [**List Available Influencers**](https://docs.hive.one/core-resources/available)
```
// Default
let response = await api.availableInfluncers();

// Requesting twitter_id's
let response = await api.availableInfluncers({ format: 'id' });

```
Argument | Required | Default | Options | Purpose
--- | --- | --- | --- | --- 
`format` | No | `screenName` | `screenName`, `id` | Change the format of the influencer ID

### [**Top Influencers**](https://docs.hive.one/core-resources/top-influencers)
```
// Default
let response = await api.topInfluencers();

// BTC with pagination
let response = await api.topInfluencers({ cluster: 'BTC', after: 50 });
```
Argument | Required | Default | Options | Purpose
--- | --- | --- | --- | --- 
`cluster` | No | `Crypto` | `Crypto`, `BTC`, `ETH`, `XRP` | Specify the cluster you want the top influencers for
`after` | No | `0` | Multiples of `50` | Used for pagination

### [**Influencer Details**](https://docs.hive.one/core-resources/profile-details-twitter-screen-name)
```
// Default
let response = await api.influencerDetails({ influencerId: 'jack' });

// Personal Rank Type
let response = await api.influencerDetails({ influencerId: 'jack', rankType: 'personal' });

// Include Followers
let response = await api.influencerDetails({ influencerId: 'jack', includeFollowers: 1 });

// Request using twitter_id
let response = await api.influencerDetails({ influencerId: '12', format: 'id' });
```
Argument | Required | Default | Options | Purpose
--- | --- | --- | --- | --- 
`influencerId` | Yes |  | | Unique ID (Screen Name or Twitter ID) for the influencer you are requesting.
`format` | No | `screenName` | `screenName`, `id` | Change the format of the influencer ID
`rankType` | No | `all` | `all`, `personal` | People are treated differently from other types of influencers (Companies, bots, etc.), if you request `all` an influencers rank/score will reflect their influence across the entire cluster, if you request `personal` their rank/score will reflect their influence across other people in the cluster.
`includeFollowers` | No | `0` | `0`, `1` | Allows you to get top followers for the requested influencer.

### [**Influencer Rank/Score History**](https://docs.hive.one/core-resources/influencer-rank-score-history-twitter-screen-name)
```
// Default
let response = await api.influencerHistory({ influencerId: 'jack' });

// Personal Rank Type
let response = await api.influencerHistory({ influencerId: 'jack', rankType: 'personal' });

// Request using twitter_id
let response = await api.influencerHistory({ influencerId: '12', format: 'id' });
```
Argument | Required | Default | Options | Purpose
--- | --- | --- | --- | --- 
`influencerId` | Yes |  | | Unique ID (Screen Name or Twitter ID) for the influencer you are requesting.
`format` | No | `screenName` | `screenName`, `id` | Change the format of the influencer ID
`rankType` | No | `all` | `all`, `personal` | People are treated differently from other types of influencers (Companies, bots, etc.), if you request `all` an influencers rank/score will reflect their influence across our entire dataset, if you request `personal` their rank/score will reflect their infulencer across other people.


### [**Influencers Podcasts**](https://docs.hive.one/core-resources/influencer-podcasts-twitter-screen-name)
```
// Default
let response = await api.influencerPodcasts({ influencerId: 'jack' });

// appearance_type
let response = await api.influencerPodcasts({ influencerId: 'jack', rankType: 'personal' });

// Pagination
let response = await api.influencerPodcasts({ influencerId: 'jack', after: 20 });

// Request using twitter_id
let response = await api.influencerPodcasts({ influencerId: '12', format: 'id' });
```
Argument | Required | Default | Options | Purpose
--- | --- | --- | --- | --- 
`influencerId` | Yes |  | | Unique ID (Screen Name or Twitter ID) for the influencer you are requesting.
`format` | No | `screenName` | `screenName`, `id` | Change the format of the influencer ID
`appearanceType` | No | `all` | `all`, `host`, `guest` | Allows you to filter podcasts whether the requested influencer was a `host` or a `guest`
`after` | No | `0` | Multiples of `20` | Used for pagination

### [**Batch Influencer Details**](https://docs.hive.one/core-resources/batch-profile-details-twitter-id)
```
// Default
let response = await api.influencerHistory({ influencerIDS: [123, 123] });
```
Argument | Required | Default | Options | Purpose
--- | --- | --- | --- | --- 
`influencerIDS` | Yes |  | | An array of twitter_ids for the influencers you want to retrieve.
`rankType` | No | `all` | `all`, `personal` | People are treated differently from other types of influencers (Companies, bots, etc.), if you request `all` an influencers rank/score will reflect their influence across our entire dataset, if you request `personal` their rank/score will reflect their infulencer across other people.
`includeFollowers` | No | `0` | `0`, `1` | Allows you to get top followers for the requested influencer.


## Changing Defaults
You can change the defaults when initializing the library

You can change the default infleuncerID format like so:
```
const hive = require('hiveone-js').default;
const api = hive({ apiKey: 'APIKEYHERE', defaultFormat = 'id' });
```

You can also change the host the library connects to (Useful if you are caching hive.one data)
```
const hive = require('hiveone-js').default;
const api = hive({ apiKey: 'APIKEYHERE', host = 'https://hosthere' });
```


## Contributions

1. Reports for issues and suggestions can be made using the [issue submission]({{cookiecutter.github_url}}/issues) interface.
2. Code contributions are submitted via [pull requests]({{cookiecutter.github_url}}/pulls)

## Developer Notes

### Developer Install

Install the latest developer version with `npm` from github:

```
npm install git+https://github.com/hive-one/hive-js
```
  
Install from `git` cloned source:

1. Ensure [git](https://git-scm.com/) is installed
2. Clone into current path
3. Install via `npm`

```
git clone https://github.com/hive-one/hive-js
cd hive-js
npm install
```

### Tests

1. Clone into current path `git clone https://github.com/hive-one/hive-js`
2. Enter into folder `cd hive-js`
3. Ensure [devDependencies](https://docs.npmjs.com/files/package.json#devdependencies) are installed and available
4. Run tests

```
npm install
npm test
```