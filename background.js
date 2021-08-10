'use strict';

const apiKey = '<your_api_key>';

chrome.browserAction.onClicked.addListener(ev => sendToTab('extensionButtonClicked', getSelection));

chrome.contextMenus.create({
    title: 'Translate with DeepL',
    contexts: ['all'],
    onclick: (info, tab) => sendToTab('contextMenuClicked', getSelection)
});

const sendToTab = (msg, onResponse = null) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, msg, onResponse);
    });
};

const serviceResponse = ev => {
    const response = JSON.parse(ev.target.response);
    sendToTab(response);
};

const getSelection = text => {
    if (typeof text === 'undefined') return;

    const xhr = new XMLHttpRequest();
    const targetLang = 'de';
    const url = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${text}&target_lang=${targetLang}`;

    xhr.open('POST', url);
    xhr.addEventListener('load', serviceResponse);
    xhr.send();
};
