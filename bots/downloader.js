const axios = require('axios'),
      unzip = require('unzip'),
      fs = require('fs'),
      WebTorrent = require('webtorrent'),
      client = new WebTorrent(),
      _cliProgress = require('cli-progress')

const progress = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);

async function robot(show) {

    await createDir()
    
    await axios.request({
            responseType: 'arraybuffer',
            url: show.subtitle.link,
            method: 'get'
          }).then((result) => {
            const outputFilename = `output/${show.preparedCode}.zip`;
            fs.writeFileSync(outputFilename, result.data);
            return outputFilename;
        });

    let subtitleFilename = show.eztvEpisode.episodeTitle.replace(/\s/g, '.').trim()
    fs.createReadStream(`output/${show.preparedCode}.zip`)
        .pipe(unzip.Parse())
        .on('entry', function (entry) {
          var fileName = entry.path;
          if (fileName === subtitleFilename + '.srt') {
            entry.pipe(fs.createWriteStream(`output/${show.preparedCode}.srt`));
          } else {
            entry.autodrain();
          }
    });

    client.add(show.eztvEpisode.magnet, {path: `output/`}, function (torrent) {

        progress.start(100, 0);
       
        torrent.on('done', function() {
            progress.stop()
            fs.renameSync(`output/${torrent.files[0].name}`, `output/${show.preparedCode}.mkv`)

            removeTemporaryFiles()
            console.log('Seu episódio foi baixado com sucesso!');

            return show;
        })

        torrent.on('download', function (bytes) {
            progress.update(torrent.progress * 100)
          })
      })


    //
    async function createDir() {

        let output = './output'
        if (!fs.existsSync(output)) {
            await fs.mkdirSync(output)
        }
    }

    async function removeTemporaryFiles() {
        //
        await fs.unlinkSync(`output/${show.preparedCode}.zip`)
    }


}

module.exports = robot