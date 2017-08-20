$(function(){

var apiKey = "0a92c2bb00de4d30895009814b3cbe80";
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var queryURL;
var typedSearch = "";
var articleCount = 0;
var startDate;
var endDate;
	$('#searchBtn').click(function(){
		$('#articles').html("");

		if($('#search').val() != "" && $('#recordQty').val() != "") {
	 		$('#search').css({'background':'white', 'border':'none'}).attr('placeholder', 'Topic Search');
			$('#recordQty').css({'background':'white', 'border':'none'}).attr('placeholder', '');
	 		$('input').addClass('disable');
			$('#searchBtn').addClass('disable');
		} else if($('#search').val() != ""){
			$('#search').css({'background':'white', 'border':'none'}).attr('placeholder', 'Topic Search');
		} else if($('#recordQty').val() != ""){
			$('#recordQty').css({'background':'white', 'border':'none'}).attr('placeholder', '');		
		} else if($('#search').val() == "" && $('#recordQty').val() == "") {
			$('#search').css({'background':'lightpink', 'border':'2px solid red'}).attr('placeholder', 'Topic Search  (Required)');
			$('#recordQty').css({'background':'lightpink', 'border':'2px solid red'}).attr('placeholder', 'Count  (Required)');
		} else if($('#search').val() == "") {
			$('#search').css({'background':'lightpink', 'border':'2px solid red'}).attr('placeholder', 'Topic Search  (Required)');
		} else if($('#recordQty').val() == "") {
			$('#recordQty').css({'background':'lightpink', 'border':'2px solid red'}).attr('placeholder', 'Count  (Required)');
		} else {
			$('input').addClass('disable');
			$('#searchBtn').addClass('disable');
		}

		typedSearch = $('#search').val();
		console.log(typedSearch);
		articleCount = $('#recordQty').val().replace("-","").replace("-","");
		startDate = $('#startDate').val().replace("-","").replace("-","");
		endDate = $('#endDate').val();

		if(startDate === "" && endDate !== "") {
			queryURL = url + '?' + $.param({
		  		'api-key': apiKey,
		  		'q': typedSearch,
		  		'end_date': endDate
		  	});	
		  	console.log(queryURL);
		} else if(startDate !== "" && endDate === "") {
			queryURL = url + '?' + $.param({
		  		'api-key': apiKey,
		  		'q': typedSearch,
		  		'begin_date': startDate
		  	});	
		  	console.log(queryURL);	  	
		} else if(startDate !== "" && endDate !== ""){
			queryURL = url + '?' + $.param({
		  		'api-key': apiKey,
		  		'q': typedSearch,
		  		'begin_date': startDate,
	  			'end_date': endDate
			});
			console.log(queryURL);
	  	} else {
	  		queryURL = url + '?' + $.param({
		  		'api-key': apiKey,
		  		'q': typedSearch
			});
	  		console.log(queryURL);
	  	}

		$.ajax({
		  url: queryURL,
		  method: "GET"
		})
		.done(function(result) {

			$('#articles').html("")

			var articles = result.response.docs;
			var resultLength = articles.length;
			var finalCount = 0;
			console.log('Result Length: ', resultLength);
		    console.log(articles);

		    if(articleCount > resultLength) {
		    	console.log('Article Count: ', articleCount);
		    	finalCount = resultLength
		    	$('#negativeResult').append(` (There are ${finalCount} results returned)`);
		    	
		    } else {
		    	finalCount = articleCount;
		    }
		    console.log('Final Count: ', finalCount);	

			for(var i=0; i< finalCount; i++) {

	        	var title = articles[i].headline.main;

		        if(articles[i].hasOwnProperty("byline")) {
		        	var author = articles[i].byline.original;
		        } else {
		        	var author = "";
		    	}

		        var section = articles[i].section_name;
		        var published = articles[i].pub_date;
		        var link = articles[i].web_url;

		        var article = $('<article>');
		        var header = $('<h3>');
		        var paragraph1 = $('<p>');
		        var paragraph2 = $('<p>');
		        var paragraph3 = $('<p>');
		        var paragraph4 = $('<p>');
		        var anchor = $('<a>');

		        header.html(title);
		        console.log('Title: ', title);
		        article.append(header);
		        paragraph1.html(`<b>Author: </b> ${author}`);
		        console.log('Author: ', author)
		        article.append(paragraph1);
		        paragraph2.html(`<b>Section: </b> ${section}`);
		        article.append(paragraph2);
		        paragraph3.html(`<b>Date Published:</b> ${published}`);
		        article.append(paragraph3);
		        anchor.attr('href', link).attr('target', '_blank');
		        anchor.html(link);
		        paragraph4.append(anchor);     
		        article.append(paragraph4);
		        $('#articles').append(article);
			}			
	    })
	});

	$('#updateBtn').click(function() {
		$('input').removeClass('disable');
		$('#searchBtn').removeClass('disable');
	});

	$('#clearBtn').click(function() {
		$('#search').val("");
		$('#recordQty').val("");
		$('#startDate').val("");
		$('#endDate').val("");
		typedSearch = "";
		articleCount = 0;
		startDate = "";
 		endDate = "";	
 		finalCount = 0;	
 		queryURL = "";
 		$('#articles').html("");
 		$('p').html("");
 		$('#search').css({'background':'white', 'border':'none'}).attr('placeholder', 'Topic Search');
		$('#recordQty').css({'background':'white', 'border':'none'}).attr('placeholder', '');
 		$('input').removeClass('disable');
		$('#searchBtn').removeClass('disable');
	});
});