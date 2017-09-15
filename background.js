/*global chrome */

chrome.commands.onCommand.addListener((command) => {
    if (command === 'next-tab') {
        chrome.tabs.query({ currentWindow: true }, tabs => {
            if (tabs.length <= 1) {
                return;
            }

            for (const tab of tabs) {
                if (tab.active) {
                    let nextTab;
                    if (tabs[tab.index + 1]) {
                        nextTab = tabs[tab.index + 1];
                    } else {
                        nextTab = tabs[0];
                    }
                    chrome.tabs.update(nextTab.id, { active: true });
                }
            }
        });
    } else if (command === 'prev-tab') {
        chrome.tabs.query({ currentWindow: true }, tabs => {
            if (tabs.length <= 1) {
                return;
            }

            for (const tab of tabs) {
                if (tab.active) {
                    let prevTab;
                    if (tabs[tab.index - 1]) {
                        prevTab = tabs[tab.index - 1];
                    } else {
                        prevTab = tabs[tabs.length - 1];
                    }
                    chrome.tabs.update(prevTab.id, { active: true });
                }
            }
        });
    } else if (command === 'pin-tab') {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            const tab = tabs[0];
            if (tab) {
                chrome.tabs.update(tab.id, { pinned: !tab.pinned });
            }
        });
    } else if (command === 'dup-tab') {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            const tab = tabs[0];
            if (tab) {
                chrome.tabs.duplicate(tab.id);
            }
        });
    }
});
