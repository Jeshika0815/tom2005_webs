async function checkdata(){
    const res = await fetch('./setting.json');
    const data = await res.json();
    return data;
}

function showdata(){
    console.log(data.title);
    console.log(data.language);
}