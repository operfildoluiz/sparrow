const eztv = require('eztv'),
      prompts = require('prompts')

async function robot(show) {

    const showEpisodes = await eztv.getShowEpisodes(show.info.code, show.info.eztv);

    let episodes = showEpisodes.episodes.filter(episode => episode.seasonNumber === show.season && episode.episodeNumber === show.episode)

    if (episodes.length) {

        let replies = await prompts([
            {
                type: 'select',
                name: 'info',
                message: 'Escolha um torrent',
                choices: episodes.map(a => {
                    return { title: `${a.episodeTitle} (${a.size})`, value: a } 
                })
            }
        ])

        replies.info.episodeTitle = replies.info.episodeTitle.replace('[eztv]', '').trim()

        return replies.info

    } else {
        return false;
    }
    
}

module.exports = robot