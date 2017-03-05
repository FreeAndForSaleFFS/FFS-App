$( document ).ready(function() {
    var searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener("click", function(){
        var b = document.getElementById('search').value,
        url = 'Browse.html?name=' + encodeURIComponent(b);
        window.location.href = url;
    });
});