const cheerio = require('cheerio'),
      axios = require('axios'),
      prompts = require('prompts')

async function robot(show) {

    let subtitleFound = true

    let mostProbablyUrl = `https://legendei.com/${show.preparedCode}`;

    let content
    try {
        content = await axios.get(mostProbablyUrl)
    } catch (e) {
        console.log('Não encontramos a página do Legendei', e);

        let reply = await prompts({
            type: 'text',
            name: 'url',
            message: 'Insira a URL do episódio'
        })

        content = reply.url

        return false
    }
   

    let $ = cheerio.load(content.data)
    let post = $('#legendeitm-posts-wrapper').text()
    let episodeName = show.eztvEpisode.episodeTitle.replace(/\s/g, '.').trim()
    
    if (post.indexOf(episodeName) === -1) {
        subtitleFound = false
        console.log('Não localizamos a legenda compatível. Vamos baixar somente o RAR')
    }
    
    let button = $('.buttondown').attr('href')

    if (!button) {

        console.log('A legenda ainda não está disponível. I\'m sorry')
        return false;

    } else {

        show.subtitle = {
            link: button,
            found: subtitleFound
        }
        
        return show
    }
   
}

module.exports = robot