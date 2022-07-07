(function () {
    const content = document.getElementById('content');

    const render = function(status) {
        const els = [];

        status.forEach(s => {
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
            message.innerHTML = s.message;

            els.push(regionBlock);
        });

        content.append(...els);
    };

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (ev) {
        const res = JSON.parse(this.responseText);
        render(res.status);
    });

    xhr.open('GET', `https://status-api.apernet.io/status.json?v=${Date.now()}`);
    xhr.send();
})();
