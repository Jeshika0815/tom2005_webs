// read_news.js
import { parseContent } from "./markdown_parse.js";
async function getAllNewsData(){
    try{
        const res = await fetch('./datas.json');
        const data = await res.json();
        return data.articles ?? {};
    }catch(e){
        console.error(e);
        return {};
    }
}

// news matching
async function query(href){
    if(!href) return null;
    const articles = await getAllNewsData();
    const keyword = href.replace(/^#/, '');
    return articles[keyword] || null;
}

// show articles
async function show_news_list(){
    const articles = await getAllNewsData();
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
async function display_news(targets){
    // データの読み込み
    const data = await query(targets);
    if(!data) return;
    
    let arContent;
    try{
        arContent = await parseContent(data.content);
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
async function show_news(e){
    const target = e.target.closest('.news_el');
    if(!target) return;

    e.preventDefault();

    const key = target.dataset.key;
    await display_news('#' + key);
}
// Initialize
document.addEventListener('amica:rendered', () =>{
    show_news_list();
    const list = document.querySelector('.news_list');
    if (list) {
        list.addEventListener('click', show_news);
    }
});