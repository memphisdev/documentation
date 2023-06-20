import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'
import fs from 'fs'
import jsdom from 'jsdom'
import axios from 'axios'
const { JSDOM } = jsdom;
const auth = "am9obkBtZW1waGlzLmRldjpSRE55YzlpaDF5VmdwQ3pWWU5lbQ=="

const docs_path = '../../docs/**/*.md';
const mdfiles = await glob(docs_path, { ignore: 'assets/**' });

function urlmeta_fetch(mdfiles) {
    const meta_data = {}
    mdfiles.forEach(file => {
        const file_content = fs.readFileSync(file, 'utf8').toString();
        const dom = new JSDOM(file_content);
        const embeds = dom.window.document.querySelectorAll('Embed');
        if (embeds.length > 0) {
            console.log(file);
            embeds.forEach(embed => {
                const url = embed.getAttribute('url');
                axios.get(`https://api.urlmeta.org/meta?url=${encodeURIComponent(url)}`, {
                    headers: {
                    Authorization: `Basic ${auth}`,
                    },
                }).then((response) => {
                    const data = response.data
                    if (data.result.status == "OK") {
                    meta_data[url] = data
                    console.log(data)
                    } else {
                    console.log("URL Meta error:", data.result.reason)
                    }
                }).catch((err) => console.log(err))
            });
        }
    });
    return meta_data;
}

function select_highest_res_favicon(favicon_options, first_favicon){
    let favicon;
    let biggest_favicon;
    for (const icon of favicon_options) {
        if (icon.getAttribute('sizes') !== null) {
            if (biggest_favicon === undefined) {
                biggest_favicon = icon;
            } else {
                if (parseInt(icon.getAttribute('sizes').split('x')[0]) > parseInt(biggest_favicon.getAttribute('sizes').split('x')[0])) {
                    biggest_favicon = icon;
                }
            }
        }
    }
    
    if (biggest_favicon !== undefined) {
        favicon = biggest_favicon.href;
    } else {
        favicon = first_favicon;
    }

    return favicon;
}

async function manual_fetch(mdfiles){
    const meta_data = {}
    const virtualConsole = new jsdom.VirtualConsole();

    for (const file of mdfiles) {
        const file_content = fs.readFileSync(file, 'utf8').toString();
        const dom = new JSDOM(file_content);
        const embeds = dom.window.document.querySelectorAll('Embed');

        if (embeds.length > 0) {
            for (const embed of embeds){
                const url = embed.getAttribute('url');
                console.log(url);
                try {
                    const data = await axios.get(url);
                    const dom = new JSDOM(data.data, { virtualConsole });
                    const title = dom.window.document.querySelector('meta[property="og:title"]').getAttribute('content');
                    const site_name = dom.window.document.querySelector('meta[property="og:site_name"]')?.content;
                    const first_favicon = dom.window.document.querySelector('link[rel="icon"]')?.href;
                    const favicon_options = dom.window.document.querySelectorAll('link[rel*="icon"]');
                    
                    const favicon = select_highest_res_favicon(favicon_options, first_favicon);

                    meta_data[url] = {
                        title: title,
                        favicon: favicon,
                        site_name: site_name
                    }
                
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    return meta_data;
}

const meta_data = await manual_fetch(mdfiles);
console.log(meta_data);

fs.writeFileSync('../../docs/meta_data.json', JSON.stringify(meta_data, null, 2), "utf-8");