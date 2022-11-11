var images=window.atob(image_urls).split(',');
for(var i in images){
    var html = "<li class=\"comic-page\"><img referrerpolicy=\"no-referrer\" class=\"lazydetail\" data-original=\"" + images[i] + "\" src=\"https://jmzj.me/static/images/loading.jpg\"></li>"
    $(".comic-list").append(html);
}