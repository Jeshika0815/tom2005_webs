// markdown_parse
export function parseContent(content){
    if(!content) return ''; 
    const htmlContent = marked.parse(content);
    return htmlContent;
}
