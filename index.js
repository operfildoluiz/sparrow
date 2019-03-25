const robots = {
    input: require('./bots/input.js'),
    eztv: require('./bots/eztv.js'),
    legendei: require('./bots/legendei.js'),
    downloader: require('./bots/downloader.js'),
} 

async function init () {

    let state = {}
    
    state = await robots.input()
    state.eztvEpisode = await robots.eztv(state)

    if (state) {
        state = await robots.legendei(state)
    }
    if (state) {
        state = await robots.downloader(state)
        console.log('Seu episódio foi baixado com sucesso!');
    }
    
}


init()