const editor = ace.edit('editor', {
    mode: 'ace/mode/json',
    selectionStyle: 'text',
    showPrintMargin: false,
    theme: 'ace/theme/chrome'
});
const formatText = (spacing = 0) => {
    try {
        const current = JSON.parse(editor.getValue());
        editor.setValue(JSON.stringify(current, null, spacing));
        return current;
    } catch (err) {
        alert('Unable to parse text as JSON');
    }
};
editor.on('paste', event => {
    try {
        event.text = JSON.stringify(JSON.parse(event.text), null, 4);
    } catch (err) {
    }
});

const saveRecord = (key, value) => {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(key, value);
    } else {
        alert("No Web Storage support");
    }
}

const loadRecord = (key) => {
    if (typeof (Storage) !== "undefined") {
        return localStorage.getItem(key);
    } else {
        alert("No Web Storage support");
    }
}

document.getElementById('validate').addEventListener('click', () => formatText(4));
document.getElementById('save').addEventListener('click', () => {
    try {
        const current = JSON.parse(editor.getValue());
        let value = JSON.stringify(current, null, 0);
        let key = document.getElementById("key").value;
        saveRecord(key, value);
    } catch (err) {
        alert(err);
    }
});
document.getElementById('load').addEventListener('click', () => {
    try {
        let key = document.getElementById("key").value;
        let value = loadRecord(key);
        const current = JSON.parse(value);
        editor.setValue(JSON.stringify(current, null, 4));
    } catch (err) {
        alert(err);
    }
});