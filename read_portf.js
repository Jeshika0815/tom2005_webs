// read_portf.js
import { parseContent } from "./markdown_parse.js";
async function getAllPortfData(){
    try{
        const res = await fetch('./datas.json');
        const data = await res.json();
        return data.portfolio ?? {};
    }catch(e){
        console.error(e);
        return {};
    }
}

// portfolio matching
async function query(href){
    if(!href) return null;
    const articles = await getAllPortfData();
    const keyword = href.replace(/^#/, '');
    return articles[keyword] || null;
}

// show articles
async function show_portf_list(){
    const articles = await getAllPortfData();
    const news_box = document.querySelector('.news_list');
    if(!news_box) return;
    news_box.innerHTML = '';
    Object.entries(articles).forEach(([key, article]) => {
        const a = document.createElement('a');
        a.href=`#${key}`;
        a.dataset.key = key;
        a.classList.add('news_el', 'std');
        a.textContent = `> ${article.release_date} | ${article.title}`;
        news_box.appendChild(a);
        news_box.appendChild(document.createElement('br'));
    });
}

// show an artcle
async function display_portf(targets){
    // データの読み込み
    const data = await query(targets);
    if(!data) return;
    const contents = await fetch(data.content);
    if(!contents) return;
    const content = await contents.text();
    
    let arContent;
    try{
        arContent = await parseContent(content);
    }catch(e){
        console.error('parse Error: ', e);
        arContent = data.content;
    }

    // モーダルの有効化
    const article_base = document.getElementById('article_base');
    article_base.style.display="block";

    article_base.innerHTML = `
    <div class="a_content">
        <div align="right"><span id="exit_art">×</span></div>
        <h1 align="left">${data.title}</h1>
        <h3 align="right">${data.release_date}</h3>
        <h4 align="right">リポジトリ：<a href="${data.repos}">${data.repos}</a></h4>
        <h4 align="right">アクセス：<a href="${data.access_url}">${data.access_url}</a></h4>
        <h4 align="right">ダウンロード：<a href="${data.dl_url}">${data.dl_url}</a></h4>
        <hr color="black" width="100%">
        <div id="maincontent">
            <p>${arContent}</p>
        </div>
    </div>
    `;
    
    article_base.querySelector('#exit_art')
    .addEventListener('click', () => {
        article_base.style.display = "none";
    });

}

// Operation for news_el
async function show_portf(e){
    const target = e.target.closest('.news_el');
    if(!target) return;

    e.preventDefault();

    const key = target.dataset.key;
    await display_portf('#' + key);
}
// Initialize
document.addEventListener('amica:rendered', () =>{
    show_portf_list();
    const list = document.querySelector('.news_list');
    if (list) {
        list.addEventListener('click', show_portf);
    }
});