'use strict';

chrome.runtime.onMessage.addListener(
    ((message, sender, respond) => {
        console.log(message);
        if (message === 'contextMenuClicked' || message === 'extensionButtonClicked') {
            const selection = getSelection();
            const selectedText = selection.toString().trim();
            respond(selectedText);
        } else {
            const output = [];
            message.translations.forEach(translation => output.push(translation.text));
            alert(output.join('\n'));
        }
    })
);
