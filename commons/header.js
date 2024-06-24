document.addEventListener('DOMContentLoaded', function(){
    let open = document.getElementById('header-side-open');
    let close = document.getElementById('header-side-close');
    let mask = document.getElementById('header-mask');
    let sideBar = document.getElementById('side-bar-container');
    open.addEventListener('click', function() {
        animateOpenSidebar(-200, 0);
        mask.style.display = 'block';
    });
    close.addEventListener('click', function() {
        animateOpenSidebar(0, -200);
        mask.style.display = 'none';
    });
    mask.addEventListener('click', function() {
        let e = new Event('click');
        close.dispatchEvent(e);
    });
    document.querySelectorAll('.side-menu-content').forEach(function(elem) {
        elem.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#484848';
        });
    });
    document.querySelectorAll('.side-menu-content').forEach(function(elem) {
        elem.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#333333';
        });
    });
    function animateOpenSidebar(start, end) {
        var duration = 150; // アニメーションの時間（ミリ秒）
        var startTime = null;
        function update(time) {
            if (!startTime) startTime = time;
            var progress = (time - startTime) / duration;
            var newPosition = start + (end - start) * progress;
            // アニメーション途中の位置を整数に切り捨てる
            newPosition = Math.floor(newPosition);
            sideBar.style.left = newPosition + 'px';
            if (progress < 1) {
                // アニメーションが終了していない場合は再帰的に呼び出し
                requestAnimationFrame(update);
            } else {
                // アニメーションが終了したら目標位置に設定する
                sideBar.style.left = end + 'px';
            }
        }
        // アニメーション開始
        requestAnimationFrame(update);
    }
});