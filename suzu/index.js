$(function() {
    $('.thumbnail-box').on('mouseover', function() {
        let url = $(this).children(0).attr('src');
        console.log(url);
        let target = $(`.main-image[src='${url}']`);
        console.log(target.attr('src'));
        $('.thumbnail-box').each(function(i, elem) {
            elem.style.border = '1px solid black';
        });
        $(this).css('border', '2px solid red');
        $('.main-image').each(function(i, elem) {
            elem.style.display = 'none';
        });
        target.css('display', 'block');
    });
});