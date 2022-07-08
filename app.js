(function () {
    const statusList = document.getElementById('status-list');
    const newsList = document.getElementById('news-list');
    const loadMore = document.getElementById('load-more');

    const formatTime = function(timeStr) {
        return new Date(timeStr).toLocaleString('en-US');
    };

    const render = function(res) {
        const sEls = [], nEls = [];

        if (res.status) {
            res.status.forEach(s => {
                const regionBlock = document.createElement('div');
                const blockHeader = document.createElement('div');
                const region = document.createElement('div');
                const status = document.createElement('div');
                const message = document.createElement('div');

                regionBlock.append(blockHeader, message);
                blockHeader.append(region, status);

                regionBlock.classList.add('region-block');
                blockHeader.classList.add('block-header');
                region.classList.add('region', `status-${s.status}`);
                status.classList.add('status', `status-${s.status}`);
                message.classList.add('message');

                const statusText = s.status.charAt(0).toUpperCase() + s.status.slice(1);

                region.innerText = s.region;
                status.innerText = statusText;
                if (s.message) {
                    const p = document.createElement('p');
                    p.innerText = s.message;
                    message.append(p);
                } else if (s.messages) {
                    s.messages.forEach(m => {
                        const p = document.createElement('p');
                        p.innerText = m;
                        message.append(p);
                    });              
                }

                sEls.push(regionBlock);
            });
        }

        if (res.news) {
            res.news.forEach(n => {
                const newsBlock = document.createElement('div');
                const blockHeader = document.createElement('div');
                const region = document.createElement('span');
                const time = document.createElement('span');
                const message = document.createElement('div');

                newsBlock.append(blockHeader, message);
                blockHeader.append(region, time);

                newsBlock.classList.add('news-block');
                blockHeader.classList.add('block-header', `type-${n.type}`);
                region.classList.add('region');
                time.classList.add('time');
                message.classList.add('message');

                region.innerText = n.region;
                time.innerText = formatTime(n.time);
                if (n.message) {
                    const p = document.createElement('p');
                    p.innerText = n.message;
                    message.append(p);
                } else if (n.messages) {
                    n.messages.forEach(m => {
                        const p = document.createElement('p');
                        p.innerText = m;
                        message.append(p);
                    });              
                }

                nEls.push(newsBlock);
            });
        }

        statusList.append(...sEls);

        const loadHandler = function() {
            const queue = nEls.splice(0, 5);
            newsList.append(...queue);

            if (nEls.length <= 0) {
                loadMore.remove();
            }
        };

        loadMore.onclick = loadHandler;
        loadHandler();
    };

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (ev) {
        const res = JSON.parse(this.responseText);
        render(res);
    });

    // xhr.open('GET', `https://status-api.apernet.io/status.json?v=${Date.now()}`);
    xhr.open('GET', `/status.json?v=${Date.now()}`);
    xhr.send();
})();
