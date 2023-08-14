import prompt_sync from 'prompt-sync';
const { prompt } = prompt_sync;

import { glob } from 'glob'
import fs from 'fs'
import jsdom from 'jsdom'
const { JSDOM } = jsdom;
import url from 'node:url';
import path from 'node:path';
import { ArgumentParser } from 'argparse';
const parser = new ArgumentParser({
    description: 'Generate sidebar.json for pdoc created documentation'
});

parser.add_argument('-s', '--source', { help: 'Path to the pdoc output directory already in vitepress', required: true });
parser.add_argument('-t', '--trim', { help: 'boolean flat to trim all leading white space of soucre files', action: 'store_true' });
parser.add_argument('-r', '--rename', { help: 'boolean flag to rename all files to md instead of html', action: 'store_true' })

const args = parser.parse_args();
const source_dir = String(args.source).replaceAll('\\', '/');

const vitepress_path = source_dir.split('/docs')[1]

if (args.rename){
    const source_files = await glob(`${source_dir}*.html`);
    for (const file of source_files){
        const file_path = url.parse(file);
        const file_name = path.basename(file_path.pathname, '.html');
        const new_file_path = `${source_dir}${file_name}.md`
        fs.renameSync(file, new_file_path);
    }
}

const source_files = await glob(`${source_dir}*.md`);
const sidebar = []

for (const file of source_files){
    let file_content = fs.readFileSync(file, 'utf8').toString();
    const file_path = url.parse(file);
    const file_name = path.basename(file_path.pathname, '.md');
    const file_name_title_case = file_name.charAt(0).toUpperCase() + file_name.slice(1);

    if (args.trim){
        file_content = trim_whitespace(file_content);
        fs.writeFileSync(file, file_content, 'utf8');
    }

    const dom = new JSDOM(file_content);
    const document = dom.window.document;
    const module_name = document.querySelector('.modulename').textContent.trim();
    const sidebar_element = {}
    sidebar_element['text'] = module_name;
    sidebar_element['link'] = `${vitepress_path}/${file_name}`
    sidebar_element['collapsed'] = true;
    sidebar_element['items'] = []

    const functions = document.querySelectorAll('.function');
    for (const funct of functions){
        if (funct.querySelector('.name') !== null){
            const name = funct.querySelector('.name').textContent.trim();
            let link_hash = `#${file_name_title_case}.${name}`
            if (file_name_title_case === name){
                link_hash = `#${name}`
            }
            
            sidebar_element.items.push({
                'text': name,
                'link': `${vitepress_path}${file_name}${link_hash}`
            });
        }
    }
    sidebar.push(sidebar_element);
}

console.dir(sidebar, { depth: null });

function trim_whitespace(file_content){
    const lines = file_content.split('\n');
    const trimmed_lines = [];
    for (const line of lines){
        trimmed_lines.push(line.trim());
    }
    return trimmed_lines.join('\n');
}