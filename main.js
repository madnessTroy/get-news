// GNews API token
// 95b073014a2053e135c84efc2e116d39
// 949841114b3a18ed4f3649649a6afc24


$(document).ready(function () {
    /* Get News btn */
    $("#get-news").click(function () {
        // get topic and lang
        var topic = $("#inputGroupTopic").val();
        var lang = $("#inputGroupLang").val();

        // hide get-news and input topic+lang
        $("#user-choose-topic").hide();
        $("#user-choose-lang").hide();
        $(this).hide();

        // show loading
        $("#loading").show();

        //console.log(topic);
        fetch("https://gnews.io/api/v4/top-headlines?topic="+topic+"&lang="+lang+"&token=95b073014a2053e135c84efc2e116d39")

            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.log(data);
                // hide loading
                $("#loading").hide();

                let output = `<h1 class="my-5 text-warning">Breaking news topic: ${topic}</h1>`;
                // loop through the entire article from GNews articles
                data.articles.forEach(function (post) {
                    output +=
                    `<div id="card-content" class="my-3 card bg-dark">
                        <div class="row g-0">
                            <div class="col-4">
                                <img src="${post.image}" class="img-fluid rounded-start" style="width: 100%">
                            </div>
                            <div class="card-body col-8">
                                <a class="card-title fs-3 fw-bold text-warning" target="_blank" href="${post.url}">${post.title}</a> <br>
                                <span class="card-text text-primary">${post.publishedAt}</span>
                                <p class="card-text text-white">${post.description}</p>
                            </div>
                        </div>
                    </div>`;

                    document.getElementById("main-body").innerHTML = output;
                });
            })
            .catch(function (error) {
                $("#loading").hide();
                $("#error").show();
            })
        });

    /* Lightbox */
    // show lightbox when search
    $("#show-lightbox").click(function () {
        $("#backdrop").animate({"opacity": 0.5}, 500, "linear");
        $("#lightbox").show();
    });

    // close lightbox
    function closeLightbox() {
        $("#lightbox").hide();
        $("#backdrop").animate({"opacity": 1}, 0, "linear");
    }
    $("#close-icon").click(function () {
        closeLightbox();
    });

    $("#search-btn").click(function () {
        var userSearch = $("#user-search").val();
        console.log(userSearch);

        // Toggle icon and inputs
        $("#loading").show();
        $("#user-choose-topic").hide();
        $("#user-choose-lang").hide();
        $("#get-news").hide();

        fetch ("https://gnews.io/api/v4/search?q="+userSearch+"&token=95b073014a2053e135c84efc2e116d39")
        .then (function (response) {
            return response.json();
        })
        .then (function (data) {
            $("#loading").hide();
            closeLightbox();

            // loop through the data and print to HTML
            var output = `<h1>You're searching for: ${userSearch}</h1>`;
            data.articles.forEach (function (post) {
                output +=
                `<div id="card-content" class="my-3 card bg-dark">
                    <div class="row g-0">
                        <div class="col-4">
                            <img src="${post.image}" class="img-fluid rounded-start" style="width: 100%; heigth: 30px;">
                        </div>
                        <div class="card-body col-8">
                            <a class="card-title fs-3 fw-bold text-warning" target="_blank" href="${post.url}">${post.title}</a> <br>
                            <span class="card-text text-primary">${post.publishedAt}</span>
                            <p class="card-text text-white">${post.description}</p>
                        </div>
                    </div>
                </div>`;

                document.getElementById("main-body").innerHTML = output;
            })
        })
        .catch(function (error) {
            $("#loading").hide();
            $("#error").show();
            var err = `<h2 class="text-center text-light bg-danger p-4 m-auto">Please check again your keywords</h2>`;
            document.getElementById("main-body").innerHTML = err;
        })
    })
});