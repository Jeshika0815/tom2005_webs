//amica_render.js 
//version 1.0.2
//Jeshika2026 created
//template engine for gitgub pages etc...

//load settings
async function load_setting() {
    try{
    const response = await fetch('./setting.json');
    const setting = await response.json();
    return setting;
    }catch(error){
        console.error("setting is not loaded");
    }
}

//reading html template
async function loadtemplate(templatePath) {
    const response = await fetch(templatePath);
    const template = await response.text();
    return template;
}

//"content" replacig
function content_replace(content){
    return content.replace(
        /<main>([\s\S]*?)<\/main>/g,
        `<div id="content" class="main-content">$1</div>`
    );
}

//replacing process of template
function templates_replace(template,setting,content){
    //display setting data
    template = template.replace(/{x title x}/g, setting.title);
    template = template.replace(/{x language x}/g, setting.language);

    //header and footer replacing
    template = template.replace(/{\^ start header \^}([\s\S]*?){\^ end header \^}/g,`<header data-processed="true">$1</header>`);
    template = template.replace(/{\^ start footer \^}([\s\S]*?){\^ end footer \^}/g,`<footer data-processed="true">$1</footer>`);

    //main content replacing
    const c_replace = content_replace(content);
    template = template.replace(/{- start content -}([\s\S]*?){- end content -}/g, c_replace);

    return template;
}

//render main
async function render(){
    const setting = await load_setting();
    const base = await loadtemplate('./base.html');
    const content = document.body.innerHTML;

    // generate html(accept setting)
    const renderedHTML = templates_replace(base,setting,content);

    // change of page content
    document.body.innerHTML = renderedHTML;

    document.dispatchEvent(new Event('amica:rendered'));
}

// running render when the page is loaded
window.addEventListener('DOMContentLoaded',render);