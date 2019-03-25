const prompts = require('prompts')

const shows = require('../shows.json')

async function robot() {

    const input = {}

    let replies = await prompts([
        {
            type: 'select',
            name: 'info',
            message: 'Escolha uma série',
            choices: shows.map(a => {
                return { title: a.name, value: a } 
            }),
            initial: 0
        },
        {
            type: 'number',
            name: 'season',
            message: 'Temporada',
            initial: 1
        },
        {
            type: 'number',
            name: 'episode',
            message: 'Episódio',
            initial: 1
        }
    ])

    input.info = replies.info;
    input.season = replies.season;
    input.episode = replies.episode;

    let episodeNumber = {
        season: addZerosToTheLeft(replies.season),
        episode: addZerosToTheLeft(replies.episode),
    }

    input.preparedCode = `${replies.info.eztv}-s${episodeNumber.season}e${episodeNumber.episode}`

    return input

    function addZerosToTheLeft(text) {
        text = "" + text
        let pad = "00"
        return pad.substring(0, pad.length - text.length) + text
    } 

}

module.exports = robot